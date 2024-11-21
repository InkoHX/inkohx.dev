---
title: Spotifyのローカルファイル機能を使って音源を読ませる前にすること
publishedAt: '2024-07-15'
modifiedAt: '2024-07-27'
categories:
  - 'Spotify'
  - 'FFmpeg'
---

Hardcore Technoが超大好きな私です。

好きなアーティストが、ちゃんとした音楽プラットフォームでは配信できないような曲のRemixを作った場合に、Spotifyのローカルファイル機能を利用して音源を取り込むケースがまぁまぁあると思います。

ですが、曲のタイトルがファイル名になったり、音量がノーマライズされなかったりするので私の場合はFFmpegでちょっと手を加えてから、取り込ませるようにしています。

## 曲名とアルバム名、アーティスト名を表示させる

FFmpegの`-metadata`オプションを使うと簡単にできます。

### 曲名を変える

```sh
$ ffmpeg -i ./in.mp3 -codec copy -metadata title="曲名" ./out.mp3
```

### アルバム名を変える

```sh
$ ffmpeg -i ./in.mp3 -codec copy -metadata album="アルバム名" ./out.mp3
```

### アーティスト名

```sh
$ ffmpeg -i ./in.mp3 -codec copy -metadata artist="アーティスト名" ./out.mp3
```

## 音声のノーマライズ

FFmpegには[loudnormフィルタ](https://ffmpeg.org/ffmpeg-filters.html#loudnorm)というものがあり、EBU R 128というものに従ってノーマライゼーションを行ってくれるものがあります。

私は[この記事](https://nico-lab.net/loudnorm_with_ffmpeg/)を参考にして、ノーマライゼーションを行っています。
Spotifyだと、`loudnorm=I=-14:LRA=11:TP=-1`でちょうどいいくらいになります。

えっ、Spotifyくんが勝手に調節してくれるんじゃないのかって？
答えは**いいえ**、私もSpotifyくんを信じてローカルファイルから再生したところ耳が破壊されかけた経験があります。

Spotifyさん、お願いします！どうかローカルファイルの音量もノーマライズしてください！

## Bunで使えるスクリプト

アーティスト名などのメタデータ設定から、ノーマライゼーションを一括で行えるスクリプトを作りました。

```ts
import fs from 'node:fs/promises'
import path from 'node:path'
import { createInterface } from 'node:readline/promises'
import { parseArgs } from 'node:util'
import { $ } from 'bun'

await main()
  .then(() => process.exit(0))
  .catch(console.error)

async function main() {
  const parsedArgs = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      title: {
        type: 'string',
        short: 't',
      },
      artist: {
        type: 'string',
        short: 'a',
        multiple: true,
      },
      album: {
        type: 'string',
        short: 'b',
      },
      output: {
        type: 'string',
        short: 'o',
      },
    },
  })

  const { title, album, artist: artists = [] } = parsedArgs.values
  const inputFilePath = parsedArgs.positionals[0]
    ? path.resolve(parsedArgs.positionals[0])
    : null

  if (!inputFilePath)
    exit('第一引数の入力は必須です。')
  if (!(await fs.exists(inputFilePath)))
    exit(`${inputFilePath} は存在しません。`)
  if (!(await fs.lstat(inputFilePath)).isFile())
    exit(`${inputFilePath} はファイルではありません。`)

  const inputFileExtension = path.extname(inputFilePath)
  const outputFilePath = parsedArgs.values.output
    ? path.resolve(parsedArgs.values.output)
    : path.join(
      process.cwd(),
      `${path.basename(inputFilePath, inputFileExtension)
      }_normalized${
        inputFileExtension}`
    )

  if (
    (await fs.exists(outputFilePath))
    && !(await confirmOverwrite(outputFilePath))
  ) {
    exit('処理を中断します。')
  }

  const loudnormSummary
    = await $`ffmpeg -i ${inputFilePath} -af "loudnorm=I=-14:LRA=11:TP=-1:print_format=json,channelmap=channel_layout=stereo,aresample=48000:resampler=soxr" -f null /dev/null 2>&1 | sed -n '/{/,/}/p`.json()
  const measuredIoudnorm = loudnormSummary.input_i
  const measuredTP = loudnormSummary.input_tp
  const measuredLRA = loudnormSummary.input_lra
  const measuredThresh = loudnormSummary.input_thresh
  const targetOffset = loudnormSummary.target_offset

  const metadata = {
    title,
    album,
    artist: artists.join(', '),
  }

  await $`ffmpeg -y -i ${inputFilePath} ${Object.entries(metadata)
    .filter(([_, value]) => value)
    .flatMap(([key, value]) => [
      '-metadata',
      `${key}=${value}`,
    ])} -af "loudnorm=I=-14:LRA=11:TP=-1:measured_I=${measuredIoudnorm}:measured_TP=${measuredTP}:measured_LRA=${measuredLRA}:measured_thresh=${measuredThresh}:offset=${targetOffset},channelmap=channel_layout=stereo,aresample=48000:resampler=soxr" ${outputFilePath}`.quiet()
}

async function confirmOverwrite(filePath: string) {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  let confirm
  while (typeof confirm !== 'boolean') {
    const answer = (
      await readline.question(
        `${filePath} を上書きしてもよろしいですか？ (y/n [n]): `
      )
    ).toLowerCase()

    if (answer === 'y') {
      confirm = true
    }
    else if (answer === 'n' || !answer) {
      confirm = false
    }
    else {
      console.error(
        '上書きするなら「y」を、しないなら「n」を入力してください。'
      )
    }
  }

  return confirm
}

function exit(message: string, code = 1): never {
  console.error(message)
  process.exit(code)
}
```

### 使い方

上記のコードを`normalize4spotify.ts`とでも名付けたファイルに書き込んで、以下のコマンドを実行するだけです。

```sh
$ bun run ./normalize4spotify.ts ./audio.mp3 --title "Kill You" --artist "BCM" --album "Massive Circlez 7"
```

実行が終わると、`./audio_normalized.mp3`というファイルが出来上がっているので、そのファイルをSpotifyに読み込んでもらえるフォルダに移すだけです。

#### 実行ファイルに変換して、実行する場合

毎回Bunで実行するのがダルい人向けです。

```sh
$ bun build ./normalize4spotify.ts --compile
$ chmod +x ./normalize4spotify
$ ./normalize4spotify ./audio.mp3 --title "Kill You" --artist "BCM" --album "Massive Circlez 7"
```

`~/.local/bin`直下にでも配置して、PATHを通しておくと便利になるでしょう。

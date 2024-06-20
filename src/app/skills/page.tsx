import {
  SiAstro,
  SiBun,
  SiCss3,
  SiDeno,
  SiDocker,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJetbrains,
  SiKotlin,
  SiLinux,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiRust,
  SiTypescript,
  SiVisualstudiocode,
  SiVuedotjs,
  SiWindows,
} from '@icons-pack/react-simple-icons'
import React from 'react'

type SkillLevel = 1 | 2 | 3
type Skill = { icon: React.ReactElement; level: SkillLevel; name: string }

const languages = [
  {
    icon: <SiJavascript color="default" className="size-24 bg-black" />,
    level: 3,
    name: 'JavaScript',
  },
  {
    icon: <SiTypescript color="default" className="size-24 bg-white" />,
    level: 3,
    name: 'TypeScript',
  },
  {
    icon: <SiHtml5 color="default" className="size-24" />,
    level: 2,
    name: 'HTML',
  },
  {
    icon: <SiCss3 color="default" className="size-24" />,
    level: 2,
    name: 'CSS',
  },
  {
    icon: <SiPhp color="default" className="size-24" />,
    level: 1,
    name: 'PHP',
  },
  {
    icon: <SiKotlin color="default" className="size-24" />,
    level: 1,
    name: 'Kotlin',
  },
  {
    icon: <SiRust color="default" className="size-24" />,
    level: 1,
    name: 'Rust',
  },
] as const satisfies ReadonlyArray<Skill>
const tools = [
  {
    icon: <SiVisualstudiocode color="default" className="size-24" />,
    level: 3,
    name: 'Visual Studio Code',
  },
  {
    icon: <SiDocker color="default" className="size-24" />,
    level: 2,
    name: 'Docker',
  },
  {
    icon: <SiGit color="default" className="size-24" />,
    level: 2,
    name: 'Git',
  },
  {
    icon: <SiJetbrains color="default" className="size-24 bg-white" />,
    level: 2,
    name: 'JetBrains IDEs',
  },
] as const satisfies ReadonlyArray<Skill>
const operatingSystems = [
  {
    icon: <SiLinux color="default" className="size-24" />,
    level: 2,
    name: 'Linux',
  },
  {
    icon: <SiWindows color="default" className="size-24" />,
    level: 2,
    name: 'Windows',
  },
] as const satisfies ReadonlyArray<Skill>
const frameworkAndLibraries = [
  {
    icon: <SiReact color="default" className="size-24" />,
    level: 2,
    name: 'React',
  },
  {
    icon: <SiAstro color="default" className="size-24" />,
    level: 2,
    name: 'Astro',
  },
  {
    icon: <SiVuedotjs color="default" className="size-24" />,
    level: 1,
    name: 'Vue.js',
  },
] as const satisfies ReadonlyArray<Skill>
const javascriptRuntime = [
  {
    icon: <SiNodedotjs color="default" className="size-24" />,
    level: 3,
    name: 'Node.js',
  },
  {
    icon: <SiDeno color="default" className="size-24" />,
    level: 2,
    name: 'Deno',
  },
  {
    icon: <SiBun color="default" className="size-24" />,
    level: 1,
    name: 'Bun',
  },
] as const satisfies ReadonlyArray<Skill>

const certifications = [
  '基本情報技術者試験',
  'ITパスポート',
  'Cisco Certified Network Associate',
  'Microsoft Office Specialist (Excel 2019)',
  '簿記実務検定 2級',
  '情報処理検定 2級',
  '普通自動車第一種運転免許 (AT限定)',
] as const satisfies ReadonlyArray<string>

const SkillSection: React.FC<{
  skills: ReadonlyArray<Skill>
  sectionName: string
}> = props => {
  const getSkillMessage = (level: SkillLevel) => {
    switch (level) {
      case 1:
        return '初心者'
      case 2:
        return '中級者'
      case 3:
        return '上級者'
    }
  }

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">{props.sectionName}</h2>
      <ul className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {props.skills.map(({ icon, name, level }) => (
          <li
            key={name}
            className="flex h-48 flex-col items-center justify-center gap-4 bg-slate-200 shadow"
          >
            <div
              data-name={name}
              className="relative cursor-help before:absolute before:-top-8 before:left-1/2 before:hidden before:w-max before:-translate-x-1/2 before:rounded before:bg-slate-600/70 before:px-2 before:text-white before:content-[attr(data-name)] before:hover:block"
            >
              {icon}
            </div>
            <div className="text-lg font-semibold">
              {getSkillMessage(level)}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function Skills() {
  return (
    <article className="py-8">
      <main className="mx-auto max-w-7xl px-4">
        <div
          className="bg-slate-100/90 bg-contain bg-right-top bg-no-repeat py-48 bg-blend-lighten lg:bg-blend-normal"
          style={{ backgroundImage: "url('/img/undraw/certificate.svg')" }}
        >
          <div className="max-w-prose">
            <h1 className="text-7xl font-bold">スキル</h1>
            <p className="mt-8 text-4xl text-slate-700">
              私が扱える言語やフレームワーク、ライブラリなどについて
            </p>
          </div>
        </div>
        <SkillSection skills={languages} sectionName="言語" />
        <SkillSection
          skills={javascriptRuntime}
          sectionName="JavaScriptランタイム"
        />
        <SkillSection skills={tools} sectionName="ツール" />
        <SkillSection skills={operatingSystems} sectionName="OS" />
        <SkillSection
          skills={frameworkAndLibraries}
          sectionName="フレームワーク・ライブラリ"
        />
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">資格・免許</h2>
          <ul className="mt-4 list-inside list-disc">
            {certifications.map(name => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
      </main>
    </article>
  )
}

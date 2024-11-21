export interface ArticleOpenGraphImageProps {
  title: string
  categories: string[]
}

const ArticleOpenGraphImage: React.FC<ArticleOpenGraphImageProps> = ({ categories, title }) => (
  <div
    style={{
      display: 'flex',
      height: '100%',
      width: '100%',
      background: '#2152ef',
      padding: 64,
      fontFamily: '\'Noto Sans JP\'',

    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#f1f5f9',
        height: '100%',
        width: '100%',
        padding: 48,
        borderRadius: 16,
        boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.35)',
      }}
    >
      <div style={{ fontSize: 64, fontWeight: 700 }}>
        {title}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            flex: 1,
          }}
        >
          {categories.map(category => (
            <div
              style={{
                fontSize: 24,
                fontWeight: 400,
                padding: '0.5rem',
                backgroundColor: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={category}
            >
              {category}
            </div>
          ))}
        </div>
        <img
          src="https://github.com/InkoHX.png"
          width={96}
          height={96}
          style={{ borderRadius: '100%' }}
        />
      </div>
    </div>
  </div>
)

export default ArticleOpenGraphImage

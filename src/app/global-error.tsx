'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html><body>
      <div style={{ display:'flex',minHeight:'100vh',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'1rem',fontFamily:'system-ui' }}>
        <h1 style={{ fontSize:'1.5rem',fontWeight:'bold' }}>Something went wrong</h1>
        <p style={{ color:'#666' }}>A critical error occurred.</p>
        <button onClick={reset} style={{ padding:'0.5rem 1rem',borderRadius:'0.375rem',backgroundColor:'#0a0a0a',color:'#fff',border:'none',cursor:'pointer' }}>
          Try Again
        </button>
      </div>
    </body></html>
  )
}

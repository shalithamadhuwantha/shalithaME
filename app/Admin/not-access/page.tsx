'use client'

export default function NotAccessPage() {
  return (
    <main
      style={{
        backgroundColor: '#000',
        color: '#bc9f00',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Courier New', Courier, monospace",
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          textShadow: '0 0 10px #bc9f00, 0 0 20px #bc9f00',
          animation: 'glitch 1.5s infinite',
          position: 'relative',
        }}
      >
        ACCESS DENIED
      </h1>

      <p
        style={{
          fontSize: '1.5rem',
          marginTop: '1rem',
          letterSpacing: '0.1em',
          textShadow: '0 0 5px #bc9f00',
        }}
      >
        Your account does not have the necessary permissions.
      </p>

      <p
        style={{
          marginTop: '2rem',
          fontSize: '1rem',
          color: '#eee',
          maxWidth: '500px',
          lineHeight: '1.5',
        }}
      >
        If you believe this is a mistake, please contact the administrator.
      </p>

      <style>{`
        @keyframes glitch {
          0% {
            text-shadow:
              2px 0 #bc9f00,
              -2px 0 cyan,
              0 2px magenta,
              0 -2px yellow;
          }
          20% {
            text-shadow:
              -2px 0 #bc9f00,
              2px 0 cyan,
              0 -2px magenta,
              0 2px yellow;
          }
          40%, 100% {
            text-shadow:
              2px 0 #bc9f00,
              -2px 0 cyan,
              0 2px magenta,
              0 -2px yellow;
          }
        }
      `}</style>
    </main>
  )
}

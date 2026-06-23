export default function RegisterPage() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px",
        textAlign: "center",
        background: "#F5F3EE",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "#888880",
          marginBottom: "16px",
        }}
      >
        Studio Membership
      </p>
      <h1
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: "28px",
          fontWeight: 400,
          color: "#1A1A18",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          margin: "0 0 12px 0",
        }}
      >
        Create Account
      </h1>
      <p
        style={{
          fontSize: "13px",
          color: "#888880",
          lineHeight: 1.6,
          maxWidth: "360px",
          margin: "0 0 40px 0",
        }}
      >
        Full registration is coming soon. To secure your account early, reach us
        at{" "}
        <a
          href="mailto:hello@ruvenstudio.in"
          style={{ color: "#1A1A18", textDecoration: "underline" }}
        >
          hello@ruvenstudio.in
        </a>
        .
      </p>
      <a
        href="/login"
        style={{
          display: "inline-block",
          background: "#1A1A18",
          color: "#F5F3EE",
          fontSize: "12px",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          padding: "0 32px",
          height: "42px",
          lineHeight: "42px",
          textDecoration: "none",
          borderRadius: 0,
        }}
      >
        ← Back to Sign In
      </a>
    </div>
  );
}

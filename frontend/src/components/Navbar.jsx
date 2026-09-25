import { useState } from 'react'

const links = [
  { label: 'Find a mechanic', href: '/mechanics' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'About us', href: '#about' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-mechanic-border bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        <a href="/" className="flex items-center gap-2" aria-label="MechanicDost home">
          <span className="grid size-10 place-items-center rounded-xl bg-mechanic-primary text-sm font-bold text-white">
            MD
          </span>
          <span className="text-lg font-bold tracking-tight text-mechanic-navy">
            Mechanic<span className="text-mechanic-primary">Dost</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-mechanic-secondary transition hover:text-mechanic-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-mechanic-secondary transition hover:bg-mechanic-surface-alt"
          >
            Log in
          </a>
          <a
            href="#get-started"
            className="rounded-lg bg-mechanic-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-mechanic-primary-dark"
          >
            Get started
          </a>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg text-mechanic-navy hover:bg-mechanic-surface-alt md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="text-2xl leading-none" aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-mechanic-border px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-mechanic-secondary hover:bg-mechanic-surface-alt"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex gap-3 border-t border-mechanic-border pt-4">
              <a href="#login" className="flex-1 rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-mechanic-secondary hover:bg-mechanic-surface-alt">
                Log in
              </a>
              <a href="#get-started" className="flex-1 rounded-lg bg-mechanic-primary px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-mechanic-primary-dark">
                Get started
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

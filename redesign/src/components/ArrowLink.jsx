import { ArrowUpRight } from '@phosphor-icons/react'

export default function ArrowLink({ href, children, external = true }) {
  return (
    <a
      className="arrow-link"
      href={href}
      {...(external && href !== '#' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      <ArrowUpRight size={15} weight="bold" />
    </a>
  )
}

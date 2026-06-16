import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FileQuestion } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  const t = useTranslations('errors')
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground" />
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-muted-foreground">{t('notFoundMessage')}</p>
      <Link href="/dashboard" className={buttonVariants()}>{t('backToHome')}</Link>
    </div>
  )
}

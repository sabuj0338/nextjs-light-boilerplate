import { useTranslations } from 'next-intl'

export default function LoginPage() {
  const t = useTranslations('auth')
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50">
      <div className="w-full max-w-md p-8 space-y-6 bg-background rounded-lg shadow-md border">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{t('loginTitle')}</h1>
          <p className="text-muted-foreground">{t('loginSubtitle')}</p>
        </div>
      </div>
    </div>
  )
}

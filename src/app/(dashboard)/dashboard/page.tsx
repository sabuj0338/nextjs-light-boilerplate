import { useTranslations } from 'next-intl'

export default function DashboardPage() {
  const t = useTranslations('nav')
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('dashboard')}</h1>
      <div className="p-6 border rounded-lg bg-card">
        <p className="text-muted-foreground">Welcome to the dashboard!</p>
      </div>
    </div>
  )
}

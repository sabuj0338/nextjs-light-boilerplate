import { useTranslations } from 'next-intl'

export default function UsersPage() {
  const t = useTranslations('nav')
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('users')}</h1>
      <div className="p-6 border rounded-lg bg-card">
        <p className="text-muted-foreground">Manage users here.</p>
      </div>
    </div>
  )
}

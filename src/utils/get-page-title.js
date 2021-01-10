import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Ktadmin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

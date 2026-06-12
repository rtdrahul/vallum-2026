'use client'
import dynamic from 'next/dynamic'

const SebiNoticePopup = dynamic(() => import('./SebiNoticePopup'), { ssr: false })

export default function SebiNoticePopupWrapper() {
  return <SebiNoticePopup />
}
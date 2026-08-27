// Path: src/components/CmsLogo.tsx
import React from 'react'

export const CmsLogo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <img 
        src="/logo.jpg" 
        alt="Logo MTsN 1 Aceh Barat Daya" 
        style={{ 
          height: '45px', 
          width: 'auto', 
          borderRadius: '8px',
          border: '2px border #D1BB07'
        }} 
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: '800', fontSize: '15px', color: '#ffffff', letterSpacing: '0.5px' }}>
          MTsN 1 ABDYA
        </span>
        <span style={{ fontWeight: '600', fontSize: '10px', color: '#D1BB07', letterSpacing: '1px' }}>
          ADMIN PORTAL
        </span>
      </div>
    </div>
  )
}

// Komponen ikon kecil saat sidebar diciutkan (collapsed)
export const CmsIcon: React.FC = () => {
  return (
    <img 
      src="/logo.jpg" 
      alt="Icon" 
      style={{ height: '32px', width: 'auto', borderRadius: '6px' }} 
    />
  )
}
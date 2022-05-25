import React from 'react'

function Layout({title, description, className, children}) {
  return (
    <div>
        <div className="p-5 bg-light">
            <h1 className="mb-3">{title}</h1>
            <p className="mb-3">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
  )
}

export default Layout
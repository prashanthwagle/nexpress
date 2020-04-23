import React from 'react'
import Link from 'next/link'
function Navbar() {
    return (
        <div>
            <ul>
                <li><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/about"><a>About</a></Link></li>
                <li><Link href="/logout"><a>Logout</a></Link></li>
            </ul>
        </div>
    )
}

export default Navbar

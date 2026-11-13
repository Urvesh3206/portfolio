import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let dotX = mouseX
    let dotY = mouseY
    let ringX = mouseX
    let ringY = mouseY
    let animId = null

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    const onEnter = () => setHidden(false)
    const onLeave = () => setHidden(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    const tick = () => {
      // Snappier interpolation (0.35 & 0.16) avoids dragging/lag feeling
      dotX += (mouseX - dotX) * 0.4
      dotY += (mouseY - dotY) * 0.4
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 3}px, ${dotY - 3}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`
      }
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)

    return () => {
      if (animId) cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${hidden ? 'hidden' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${hidden ? 'hidden' : ''}`} />
    </>
  )
}

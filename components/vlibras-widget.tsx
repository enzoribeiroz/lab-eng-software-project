"use client"

import { useEffect, type EffectCallback } from "react"

type ExpectedReadyState = ReadonlyArray<DocumentReadyState> | DocumentReadyState | undefined

const isReadyStateMatch = (expected?: ExpectedReadyState): boolean => {
  if (!expected) return true
  if (typeof expected === "string") return document.readyState === expected
  return (expected as ReadonlyArray<DocumentReadyState>).indexOf(document.readyState) !== -1
}

const useReadyStateEffect = (
  effect: EffectCallback,
  deps: unknown[] = [],
  onState: ExpectedReadyState = "complete"
): void => {
  useEffect(() => {
    const destructors: Array<() => void> = [
      () => document.removeEventListener("readystatechange", listener),
    ]
    const listener = () => {
      if (!isReadyStateMatch(onState)) return
      const destructor = effect()
      if (destructor) destructors.push(destructor)
    }
    listener()
    document.addEventListener("readystatechange", listener)
    return () => destructors.forEach((d) => d())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

interface VLibrasWidgetProps {
  forceOnload?: boolean
}

export function VLibrasWidget({ forceOnload = true }: VLibrasWidgetProps) {
  useReadyStateEffect(
    () => {
      const script = document.createElement("script")
      script.src = "https://vlibras.gov.br/app/vlibras-plugin.js"
      script.async = true
      script.onload = () => {
        // @ts-ignore
        new window.VLibras.Widget("https://vlibras.gov.br/app")
        // @ts-ignore
        if (forceOnload) window.onload()
      }
      document.head.appendChild(script)
    },
    [forceOnload],
    "complete"
  )

  return (
    // @ts-ignore
    <div vw="true" className="enabled">
      {/* @ts-ignore */}
      <div vw-access-button="true" className="active" />
      {/* @ts-ignore */}
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  )
}

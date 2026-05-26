"use client"

import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="flex items-center justify-center rounded-2xl p-8 text-center"
            style={{ border: "1px solid var(--border)", background: "var(--card)" }}
          >
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Something went wrong. Please refresh.
            </p>
          </div>
        )
      )
    }
    return this.props.children
  }
}

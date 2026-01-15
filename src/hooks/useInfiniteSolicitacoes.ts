import { useCallback, useEffect, useRef, useState } from 'react'
import { getAllAgendamentosByUserId } from '../api/agendamentos/getAllAgendamentosByUserId'

export function useInfiniteSolicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState<any[]>([])
    const [cursor, setCursor] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)

    const isFetchingRef = useRef(false)

    const scrollRootRef = useRef<HTMLElement | null>(null)
    const sentinelRef = useRef<HTMLDivElement | null>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    /* =======================
       REFS
    ======================= */


    const setScrollRoot = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            console.log('[setScrollRoot]', node)
            scrollRootRef.current = node
        }
    }, [])

    const observe = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            console.log('[setSentinel]', node)
            sentinelRef.current = node
        }
    }, [])

    /* =======================
       DATA
    ======================= */

    const loadMore = useCallback(async () => {
        if (isFetchingRef.current || !hasMore) return

        isFetchingRef.current = true
        setLoading(true)

        console.log('[loadMore] cursor:', cursor)

        try {
            const { data, nextCursor } = await getAllAgendamentosByUserId(
                cursor ?? undefined
            )

            console.log('[API] recebidos:', data.length)

            setSolicitacoes(prev => {
                const map = new Map<string, any>()
                for (const item of [...prev, ...data]) {
                    map.set(item.id, item)
                }
                return Array.from(map.values())
            })

            setCursor(nextCursor ?? null)
            setHasMore(Boolean(nextCursor))
        } finally {
            isFetchingRef.current = false
            setLoading(false)
        }
    }, [cursor, hasMore])

    /* =======================
       OBSERVER
    ======================= */

    useEffect(() => {
        if (!scrollRootRef.current || !sentinelRef.current) return

        observerRef.current?.disconnect()

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                console.log('[observer] intersecting:', entry.isIntersecting)

                if (
                    entry.isIntersecting &&
                    !isFetchingRef.current &&
                    hasMore
                ) {
                    loadMore()
                }
            },
            {
                root: scrollRootRef.current,
                rootMargin: '100px',
            }
        )

        observerRef.current.observe(sentinelRef.current)

        return () => observerRef.current?.disconnect()
    }, [loadMore, hasMore])



    /* =======================
       ACTIONS
    ======================= */

    const prepend = (item: any) => {
        setSolicitacoes(prev => [item, ...prev])
    }

    const remove = (id: string) => {
        setSolicitacoes(prev => prev.filter(item => item.id !== id))
    }

    const reload = async () => {
        console.log('[reload]')
        observerRef.current?.disconnect()
        setSolicitacoes([])
        setCursor(null)
        setHasMore(true)
        await loadMore()
    }

    /* =======================
       INIT
    ======================= */

    useEffect(() => {
        loadMore()
    }, [])

    return {
        solicitacoes,
        loading,
        observe,
        setScrollRoot,
        prepend,
        remove,
        reload,
    }
}

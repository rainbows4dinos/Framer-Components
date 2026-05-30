import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

export default function UpcomingShows(props) {
    const {
        artistName,
        appId,
        showFeatured,
        pageSize,
        loadMoreLabel,
        background,
        textColor,
        linkColor,
        mutedTextColor,
        borderColor,
        accentColor,
        radius,
        padding,
        gap,
        cardPadding,
        headingSize,
        bodySize,
        bodySizeSm,
        buttonRadius,
    } = props

    const [shows, setShows] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [visibleCount, setVisibleCount] = React.useState(0)

    const paginationEnabled = pageSize > 0

    React.useEffect(() => {
        async function loadShows() {
            if (!artistName || !appId) {
                setLoading(false)
                return
            }

            try {
                const url = `https://rest.bandsintown.com/artists/${encodeURIComponent(
                    artistName
                )}/events/?app_id=${appId}`

                const res = await fetch(url)
                const data = await res.json()

                setShows(Array.isArray(data) ? data : [])
            } catch (err) {
                console.error("Bandsintown error:", err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        loadShows()
    }, [artistName, appId])

    React.useEffect(() => {
        if (!paginationEnabled) {
            setVisibleCount(shows.length)
            return
        }

        setVisibleCount(Math.min(pageSize, shows.length))
    }, [shows, pageSize, paginationEnabled])

    function formatShowDate(datetime) {
        const date = new Date(datetime)

        const weekday = date
            .toLocaleDateString("en-US", { weekday: "short" })
            .toUpperCase()

        const monthDay = date
            .toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            })
            .toUpperCase()

        const time = date
            .toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
            })
            .replace(/\s?(AM|PM)/i, "")

        return `${weekday}, ${monthDay} - ${time}`
    }

    function getEventMeta(show) {
        return [
            show.venue?.name,
            getLocation(show),
        ]
            .filter(Boolean)
            .join(" · ")
    }

    function getBilling(show) {
        const description = show.description?.trim()

        if (description) return description

        const lineup = Array.isArray(show.lineup)
            ? show.lineup.filter(Boolean)
            : []

        if (lineup.length) return lineup.join(" , ")

        return ""
    }

    function getLocation(show) {
        return [show.venue?.city, show.venue?.region].filter(Boolean).join(", ")
    }

    function getCta(show) {
        const offer = show.offers?.[0]

        return {
            label: offer?.url ? "View Event" : "Notify Me",
            url: offer?.url || `${show.url}&trigger=notify_me`,
        }
    }

    const baseStyles = {
        background: "transparent",
        color: textColor,
        padding,
        fontFamily: "inherit",
    }

    const cardStyles = {
        backgroundColor: "#E9E7D9",
        borderRadius: radius,
        padding: cardPadding,
    }

    if (loading) {
        return <div style={baseStyles}>Loading shows…</div>
    }

    if (error) {
        return <div style={baseStyles}>Couldn’t load shows right now.</div>
    }

    if (!shows.length) {
        return <div style={baseStyles}>No upcoming shows right now.</div>
    }

    const [nextShow, ...otherShows] = shows
    const listShows = showFeatured ? otherShows : shows
    const effectiveVisibleCount = paginationEnabled
        ? Math.max(visibleCount, Math.min(pageSize, listShows.length))
        : listShows.length
    const displayedShows = listShows.slice(0, effectiveVisibleCount)
    const hasMore =
        paginationEnabled && effectiveVisibleCount < listShows.length

    function ShowCard({ show, featured = false }) {
        const cta = getCta(show)

        // console.log({
        //     title: show.title,
        //     venueName: show.venue?.name,
        //     city: show.venue?.city,
        //     region: show.venue?.region,
        //     datetime: show.datetime,
        //     description: show.description,
        // })

        return (
            <article
                style={{
                    ...cardStyles,
                    display: "grid",
                    gap: "8px",
                    fontFamily: "Open Sans,sans-serif",
                }}
            >
                <div
                    style={{
                        fontSize: bodySizeSm,
                        fontWeight: 600,
                        color: mutedTextColor,
                        textTransform: "uppercase",
                    }}
                >
                    {formatShowDate(show.datetime)}
                </div>

                <h3
                    style={{
                        margin: 0,
                        fontSize: headingSize,
                        lineHeight: 1,
                    }}
                >
                    <a
                        href={cta.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            textDecoration: "none",
                            color: linkColor,
                        }}
                    >
                        {getEventMeta(show) || artistName}
                    </a>
                </h3>
       
                <p 
                    style={{ 
                        margin: 0,
                        padding: 0,
                        fontSize: bodySize, 
                        color: mutedTextColor 
                    }}
                >
                    {getBilling(show)}
                </p>

                <a
                    href={cta.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        justifySelf: "start",
                        display: "flex",
                        alignItems: "center",
                        marginTop: 8,
                        height: "24px",
                        padding: "0 8px",
                        borderBottom: `1px solid ${textColor}`,
                        borderRight: `1px solid ${textColor}`,
                        borderRadius: buttonRadius,
                        color: textColor,
                        backgroundColor: accentColor,
                        textDecoration: "none",
                        textTransform: "uppercase",
                        fontSize: bodySizeSm,
                        fontWeight: "bold",
                        letterSpacing: "0.01em",
                    }}
                >
                    {cta.label}
                </a>
            </article>
        )
    }

    const loadMoreButtonStyle = {
        justifySelf: "start",
        display: "flex",
        alignItems: "center",
        height: "24px",
        padding: "0 8px",
        border: "none",
        borderBottom: `1px solid ${textColor}`,
        borderRight: `1px solid ${textColor}`,
        borderRadius: buttonRadius,
        color: textColor,
        backgroundColor: accentColor,
        textTransform: "uppercase",
        fontSize: bodySizeSm,
        fontWeight: "bold",
        letterSpacing: "0.01em",
        cursor: "pointer",
        fontFamily: "inherit",
    }

    return (
        <section style={baseStyles}>
            <div style={{ display: "grid", gap }}>
                {showFeatured && <ShowCard show={nextShow} featured />}

                {displayedShows.map((show) => (
                    <ShowCard key={show.id} show={show} />
                ))}

                {hasMore && (
                    <button
                        type="button"
                        style={loadMoreButtonStyle}
                        onClick={() =>
                            setVisibleCount((count) =>
                                Math.min(
                                    (count || pageSize) + pageSize,
                                    listShows.length
                                )
                            )
                        }
                    >
                        {loadMoreLabel}
                    </button>
                )}
            </div>
        </section>
    )
}

addPropertyControls(UpcomingShows, {
    artistName: {
        type: ControlType.String,
        title: "Artist",
        defaultValue: "Merwulf",
    },
    appId: {
        type: ControlType.String,
        title: "API Key",
        defaultValue: "",
    },
    showFeatured: {
        type: ControlType.Boolean,
        title: "Feature Next",
        defaultValue: true,
    },
    pageSize: {
        type: ControlType.Number,
        title: "Per Page",
        description: "0 = show all events",
        defaultValue: 0,
        min: 0,
        max: 50,
        step: 1,
    },
    loadMoreLabel: {
        type: ControlType.String,
        title: "Load More Label",
        defaultValue: "Load more shows",
        hidden: (props) => !props.pageSize,
    },
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "none"
    },
    textColor: {
        type: ControlType.Color,
        title: "Text",
        defaultValue: "#121212",
    },
    linkColor: {
        type: ControlType.Color,
        title: "Link",
        defaultValue: "#806E00",
    },
    mutedTextColor: {
        type: ControlType.Color,
        title: "Muted Text",
        defaultValue: "#323232",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border",
        defaultValue: "#121212",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent",
        defaultValue: "#FCE0A4",
    },
    radius: {
        type: ControlType.Number,
        title: "Radius",
        defaultValue: 0,
        min: 0,
        max: 40,
    },
    padding: {
        type: ControlType.Number,
        title: "Outer Padding",
        defaultValue: 0,
        min: 0,
        max: 120,
    },
    gap: {
        type: ControlType.Number,
        title: "Gap",
        defaultValue: 16,
        min: 0,
        max: 80,
    },
    cardPadding: {
        type: ControlType.Number,
        title: "Card Padding",
        defaultValue: 20,
        min: 0,
        max: 80,
    },
    headingSize: {
        type: ControlType.Number,
        title: "Heading Size",
        defaultValue: 16,
        min: 12,
        max: 28,
    },
    bodySize: {
        type: ControlType.Number,
        title: "Body Size",
        defaultValue: 16,
        min: 10,
        max: 20,
    },
     bodySizeSm: {
        type: ControlType.Number,
        title: "Body Size Sm",
        defaultValue: 14,
        min: 8,
        max: 16,
    },
    buttonRadius: {
        type: ControlType.Number,
        title: "Button Radius",
        defaultValue: 0,
        min: 0,
        max: 40,
    },
})

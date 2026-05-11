import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

export default function UpcomingShows(props) {
    const {
        artistName,
        appId,
        showFeatured,
        background,
        textColor,
        mutedTextColor,
        borderColor,
        accentColor,
        radius,
        padding,
        gap,
        cardPadding,
        headingSize,
        bodySize,
        buttonRadius,
    } = props

    const [shows, setShows] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)

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

    function formatDate(datetime) {
        return new Date(datetime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    function getLocation(show) {
        return [show.venue?.city, show.venue?.region].filter(Boolean).join(", ")
    }

    function getCta(show) {
        const offer = show.offers?.[0]

        return {
            label: offer?.url ? "Tickets" : "Notify Me",
            url: offer?.url || `${show.url}&trigger=notify_me`,
        }
    }

    const baseStyles = {
        background,
        color: textColor,
        padding,
        fontFamily: "inherit",
    }

    const cardStyles = {
        border: `1px solid ${borderColor}`,
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

    function ShowCard({ show, featured = false }) {
        const cta = getCta(show)

        return (
            <article
                style={{
                    ...cardStyles,
                    display: "grid",
                    gap: featured ? 16 : 8,
                }}
            >
                <div
                    style={{
                        color: accentColor,
                        fontSize: bodySize,
                    }}
                >
                    {featured ? "Next Up" : formatDate(show.datetime)}
                </div>

                {featured && (
                    <div
                        style={{
                            fontSize: bodySize,
                            color: mutedTextColor,
                        }}
                    >
                        {formatDate(show.datetime)}
                    </div>
                )}

                <h3
                    style={{
                        margin: 0,
                        fontSize: featured ? headingSize * 1.4 : headingSize,
                        lineHeight: 1,
                    }}
                >
                    {show.title || show.venue?.name}
                </h3>

                <div style={{ fontSize: bodySize, color: mutedTextColor }}>
                    {show.venue?.name}
                    {getLocation(show) ? ` · ${getLocation(show)}` : ""}
                </div>

                <a
                    href={cta.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        justifySelf: "start",
                        marginTop: 8,
                        padding: "10px 14px",
                        border: `1px solid ${accentColor}`,
                        borderRadius: buttonRadius,
                        color: accentColor,
                        textDecoration: "none",
                        fontSize: bodySize,
                        letterSpacing: "0.06em",
                    }}
                >
                    {cta.label}
                </a>
            </article>
        )
    }

    return (
        <section style={baseStyles}>
            <div style={{ display: "grid", gap }}>
                {showFeatured && <ShowCard show={nextShow} featured />}

                {(showFeatured ? otherShows : shows).map((show) => (
                    <ShowCard key={show.id} show={show} />
                ))}
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
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#000000",
    },
    textColor: {
        type: ControlType.Color,
        title: "Text",
        defaultValue: "#FFFFFF",
    },
    mutedTextColor: {
        type: ControlType.Color,
        title: "Muted Text",
        defaultValue: "#A0A0A0",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border",
        defaultValue: "#FFFFFF",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent",
        defaultValue: "#FF3B00",
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
        defaultValue: 28,
        min: 12,
        max: 96,
    },
    bodySize: {
        type: ControlType.Number,
        title: "Body Size",
        defaultValue: 14,
        min: 10,
        max: 32,
    },
    buttonRadius: {
        type: ControlType.Number,
        title: "Button Radius",
        defaultValue: 0,
        min: 0,
        max: 40,
    },
})

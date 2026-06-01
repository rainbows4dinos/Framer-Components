import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Thin code button for use with BandsInTown_Feed_v3 via the Event CTA Button outlet.
 * Accepts label, link, and loading so the feed can clone one instance per event card.
 */
export default function EventButton(props) {
    const {
        label = "View Event",
        link,
        loading = false,
        textColor = "#121212",
        accentColor = "#FCE0A4",
        buttonRadius = 0,
        bodySizeSm = 14,
    } = props

    const style: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: "24px",
        padding: "0 8px",
        borderBottom: `1px solid ${textColor}`,
        borderRight: `1px solid ${textColor}`,
        borderRadius: buttonRadius,
        borderTop: "none",
        borderLeft: "none",
        color: textColor,
        backgroundColor: accentColor,
        textDecoration: "none",
        textTransform: "uppercase",
        fontSize: bodySizeSm,
        fontWeight: "bold",
        letterSpacing: "-0.4px",
        fontFamily: "Open Sans,sans-serif",
        cursor: loading ? "wait" : "pointer",
        opacity: loading ? 0.7 : 1,
        pointerEvents: loading ? "none" : "auto",
    }

    const content = loading ? "Loading…" : label

    if (link && !loading) {
        return (
            <a href={link} target="_blank" rel="noreferrer" style={style}>
                {content}
            </a>
        )
    }

    return (
        <button type="button" disabled={loading} style={style}>
            {content}
        </button>
    )
}

addPropertyControls(EventButton, {
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "View Event",
    },
    link: {
        type: ControlType.Link,
        title: "Link",
    },
    loading: {
        type: ControlType.Boolean,
        title: "Loading",
        defaultValue: false,
    },
    textColor: {
        type: ControlType.Color,
        title: "Text",
        defaultValue: "#121212",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent",
        defaultValue: "#FCE0A4",
    },
    buttonRadius: {
        type: ControlType.Number,
        title: "Radius",
        defaultValue: 0,
        min: 0,
        max: 40,
    },
    bodySizeSm: {
        type: ControlType.Number,
        title: "Text Size",
        defaultValue: 14,
        min: 8,
        max: 16,
    },
})

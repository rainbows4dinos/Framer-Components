import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Code button for BandsInTown_Feed_v3 Load More Button outlet.
 * Accepts label, onClick, and loading from the feed via cloneElement.
 */
export default function LoadMoreButton(props) {
    const {
        label = "Load more shows",
        loading = false,
        onClick,
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
        border: "none",
        borderBottom: `1px solid ${textColor}`,
        borderRight: `1px solid ${textColor}`,
        borderRadius: buttonRadius,
        color: textColor,
        backgroundColor: accentColor,
        textTransform: "uppercase",
        fontSize: bodySizeSm,
        fontWeight: "bold",
        letterSpacing: "-0.4px",
        fontFamily: "Open Sans,sans-serif",
        cursor: loading ? "wait" : "pointer",
        opacity: loading ? 0.7 : 1,
    }

    return (
        <button
            type="button"
            disabled={loading}
            onClick={onClick}
            style={style}
        >
            {loading ? "Loading…" : label}
        </button>
    )
}

LoadMoreButton.isFeedCodeButton = true

addPropertyControls(LoadMoreButton, {
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "Load more shows",
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

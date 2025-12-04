import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const ShipStatus: QuartzComponent = ({ allFiles, fileData, displayClass }: QuartzComponentProps) => {
    
    // DEBUG: Check where we are
    if (fileData.slug === "index") {
      console.log(`[ShipStatus] Checking Home Page...`)
    }

    if (fileData.slug !== "index") {
      return <></>
    }

    // Filter for logs
    const logs = allFiles.filter((file) => file.slug?.startsWith("log/"))
    console.log(`[ShipStatus] Logs found: ${logs.length}`)

    // Sort logs
    logs.sort((a, b) => {
      const aVal = a.frontmatter?.date ? a.frontmatter.date.toString() : 0
      const bVal = b.frontmatter?.date ? b.frontmatter.date.toString() : 0
      
      const dateA = new Date(aVal)
      const dateB = new Date(bVal)
      return dateB.getTime() - dateA.getTime()
    })

    const latestLog = logs[0]

    if (!latestLog) {
      console.log(`[ShipStatus] No logs found!`)
      return <></>
    } else {
       console.log(`[ShipStatus] Using log: ${latestLog.slug}`)
    }

    // Data Extraction
    const status = (latestLog.frontmatter?.status as string) || "Unknown"
    const fuel = (latestLog.frontmatter?.fuel as string) || "0"
    const depth = (latestLog.frontmatter?.depth as string) || "Unknown"
    const location = (latestLog.frontmatter?.location as string) || "Unknown"
    const title = (latestLog.frontmatter?.title as string) || "Log Entry"

    return (
      <div class={`ship-status-container ${displayClass ?? ""}`}>
        <div class="ship-header">⚡ ELECTRA STATUS REPORT ⚡</div>
        <div class="ship-grid">
          <div class="stat-box">
            <span class="label">CURRENT STATUS</span>
            <span class="value">{status}</span>
          </div>
          <div class="stat-box">
            <span class="label">DEPTH</span>
            <span class="value">{depth}</span>
          </div>
          <div class="stat-box">
            <span class="label">FUEL RESERVES</span>
            <span class="value">{fuel} UNITS</span>
          </div>
           <div class="stat-box">
            <span class="label">LOCATION</span>
            <span class="value">{location}</span>
          </div>
        </div>
        <div class="ship-footer">
          DATA PULLED FROM: <a href={`/${latestLog.slug}`}>{title}</a>
        </div>
      </div>
    )
  }

  ShipStatus.css = `
  .ship-status-container {
    border: 2px solid var(--secondary);
    background-color: rgba(0, 0, 0, 0.2);
    padding: 1rem;
    margin: 2rem 0;
    font-family: var(--codeFont);
  }
  .ship-header {
    font-weight: bold;
    text-align: center;
    border-bottom: 1px dashed var(--secondary);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    letter-spacing: 0.1em;
    color: var(--secondary);
  }
  .ship-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .stat-box {
    display: flex;
    flex-direction: column;
  }
  .label {
    font-size: 0.7em;
    text-transform: uppercase;
    opacity: 0.7;
  }
  .value {
    font-size: 1.1em;
    font-weight: bold;
  }
  .ship-footer {
    margin-top: 1rem;
    font-size: 0.8em;
    text-align: right;
    font-style: italic;
    opacity: 0.6;
  }
  `

  return ShipStatus
}) satisfies QuartzComponentConstructor
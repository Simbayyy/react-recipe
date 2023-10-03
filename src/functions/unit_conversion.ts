
export function getConversionFactor(unit:string):number {
    let conversionFactor: number = 0 
    
    let volumeMatch: RegExpMatchArray | null = unit.match(/^(?<prefix>.)?l$/i)
    if (volumeMatch !== null) {
        if (volumeMatch.groups !== undefined) {
            if (volumeMatch.groups.prefix == 'c') {
                conversionFactor = 10
            } else if (volumeMatch.groups.prefix == 'm') {
                conversionFactor = 1
            } else if (volumeMatch.groups.prefix == 'd') {
                conversionFactor = 100
            } else if (volumeMatch.groups.prefix === undefined) {
                conversionFactor = 1000
            }
        }
    }

    let massMatch: RegExpMatchArray | null = unit.match(/^(?<prefix>.)?g$/i)
    if (massMatch !== null) {
        if (massMatch.groups !== undefined) {
            if (massMatch.groups.prefix == 'c') {
                conversionFactor = 0.01
            } else if (massMatch.groups.prefix == 'm') {
                conversionFactor = 0.001
            } else if (massMatch.groups.prefix == 'd') {
                conversionFactor = 0.1
            } else if (massMatch.groups.prefix === undefined) {
                conversionFactor = 1
            } else if (massMatch.groups.prefix == 'k') {
                conversionFactor = 1000
            } 
        }
    }

    let csMatch: RegExpMatchArray | null = unit.match(/^cs$/i)
    if (csMatch !== null) {
        conversionFactor = 15
    }
    
    let ccMatch: RegExpMatchArray | null = unit.match(/^cc$/i)
    if (ccMatch !== null) {
        conversionFactor = 5
    }


    return conversionFactor
}
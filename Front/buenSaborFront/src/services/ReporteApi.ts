export async function getReporteFechas(fechaDesde: string, fechaHasta: string) {
    const response = await fetch(`https://buensabor-back-hpyp.onrender.com/report/excel?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));

    return url
}
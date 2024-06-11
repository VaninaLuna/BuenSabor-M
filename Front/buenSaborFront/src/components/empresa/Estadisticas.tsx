import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
);

export function Estadisticas() {
    // Datos y opciones para los gráficos
    const barData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Ventas',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const lineData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Ingresos',
                data: [33, 53, 85, 41, 44, 65],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    };

    const pieData = {
        labels: ['Rojo', 'Azul', 'Amarillo'],
        datasets: [
            {
                label: 'Colores',
                data: [300, 50, 100],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            },
        ],
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <h1 style={{ marginTop: '20px' }}>Estadisticas</h1>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '80%', margin: '20px 0' }}>
                    <div style={{ width: '15cm', height: '5cm' }}>
                        <h2>Ventas Mensuales</h2>
                        <Bar data={barData} options={{ maintainAspectRatio: false }} />
                    </div>
                    <div style={{ width: '15cm', height: '5cm' }}>
                        <h2>Ingresos Mensuales</h2>
                        <Line data={lineData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
                <br></br>
                <br></br>
                <div style={{ width: '15cm', height: '10cm', marginBottom: '20px' }}>
                    <h2>Distribución de Colores</h2>
                    <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>
        </>
    );
}

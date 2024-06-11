import { useEffect, useState } from "react";
import { getPedidosPorMesAnio } from "../../services/PedidoApi";
import PedidosPorMesAnioDTO from "../../models/PedidosPorMesAnioDTO";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

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

type BarParams = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderWidth: number;
    }[];
}


const BarChart = () => {
    const [chartData, setChartData] = useState<BarParams>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPedidosPorMesAnio();

                const labels = data.map((d: PedidosPorMesAnioDTO) => `${d.month}-${d.year}`);
                const counts = data.map((d: PedidosPorMesAnioDTO) => d.count);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Cantidad de Pedidos',
                            data: counts,
                            backgroundColor: '#e7a17a',
                            borderWidth: 4,
                        },
                    ],
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {chartData ? (
                <Bar data={chartData} />
            ) : (
                <p>Cargando datos del gráfico...</p>
            )}
        </div>
    );
};

export default BarChart;
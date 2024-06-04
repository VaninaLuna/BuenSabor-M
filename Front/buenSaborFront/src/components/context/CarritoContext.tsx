import { ReactNode, createContext, useEffect, useState } from "react";
import ArticuloDTO from "../../models/ArticuloDTO";
import PedidoDetalle from "../../models/PedidoDetalle";

interface CartContextType {
    cart: PedidoDetalle[];
    addCarrito: (product: ArticuloDTO) => void;
    removeCarrito: (product: ArticuloDTO) => void;
    removeItemCarrito: (product: ArticuloDTO) => void;
    limpiarCarrito: () => void;
    limpiarCarritoDespuesPago: () => void;
    totalPedido?: number;
}

export const CartContext = createContext<CartContextType>({
    cart: [],
    addCarrito: () => { },
    removeCarrito: () => { },
    removeItemCarrito: () => { },
    limpiarCarrito: () => { },
    limpiarCarritoDespuesPago: () => { },
    totalPedido: 0
})

export function CarritoContextProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<PedidoDetalle[]>([]);
    const [totalPedido, setTotalPedido] = useState<number>(0);

    useEffect(() => {
        calcularTotalCarrito();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    const addCarrito = (articulo: ArticuloDTO) => {
        setCart(prevCart => {
            const productInCart = cart.find((detalle) => detalle.articulo.id === articulo.id);

            if (productInCart) {
                const updatedCart = prevCart.map(detalle =>
                    detalle.articulo.id === articulo.id
                        ? { ...detalle, cantidad: detalle.cantidad + 1, subTotal: detalle.articulo.precioVenta * (detalle.cantidad + 1) }
                        : detalle
                );
                return updatedCart;
            } else {
                const newDetalle = new PedidoDetalle();
                newDetalle.cantidad = 1;
                newDetalle.articulo = articulo;
                newDetalle.subTotal = newDetalle.articulo.precioVenta * newDetalle.cantidad;
                return [...prevCart, newDetalle];
            }
        });
    }

    const removeCarrito = (articulo: ArticuloDTO) => {
        setCart(prevCart =>
            prevCart.filter(detalle => detalle.articulo.id !== articulo.id)
        );
    }

    const removeItemCarrito = (articulo: ArticuloDTO) => {
        setCart(prevCart => {
            const productInCart = cart.find(detalle => detalle.articulo.id === articulo.id);

            if (productInCart && productInCart.cantidad > 1) {
                const updatedCart = cart.map(detalle =>
                    detalle.articulo.id === articulo.id
                        ? { ...detalle, cantidad: detalle.cantidad - 1 }
                        : detalle
                );
                return updatedCart;
            } else {
                return prevCart.filter(detalle => detalle.articulo.id !== articulo.id);
            }
        });
    }

    const limpiarCarrito = () => {
        setCart([]);
    }

    const limpiarCarritoDespuesPago = () => {
        setCart([]);
    }

    const calcularTotalCarrito = () => {
        let total: number = 0;
        cart.forEach(detalle =>
            total += detalle.cantidad * detalle.articulo.precioVenta
        );
        setTotalPedido(total);
    }

    return (
        <CartContext.Provider value={{ cart, addCarrito, limpiarCarrito, limpiarCarritoDespuesPago, removeCarrito, removeItemCarrito, totalPedido }}>
            {children}
        </CartContext.Provider>
    );
}

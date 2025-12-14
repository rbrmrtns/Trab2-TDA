import { Stack } from 'expo-router';
import { CarrinhoProvider } from '../context/ContextCarrinho';

export default function Layout() {
  return (
    <CarrinhoProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="listagem-produtos" />
        <Stack.Screen name="carrinho" />
        <Stack.Screen name="produto" />
      </Stack>
    </CarrinhoProvider>
  );
}
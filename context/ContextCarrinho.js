import React, { createContext, useContext, useState } from 'react';

const ContextoCarrinho = createContext({});

export function CarrinhoProvider({ children }) {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  function addAoCarrinho(produto) {
    setItensCarrinho(itensAtuais => {
      const itemExiste = itensAtuais.find(item => item.id === produto.id);
      if (itemExiste) {
        return itensAtuais.map(item => 
          item.id === produto.id ? { ...item, quant: item.quant + 1 } : item
        );
      }
      return [...itensAtuais, { ...produto, quant: 1 }];
    });
  }

  function removerDoCarrinho(id) {
    setItensCarrinho(itensAtuais => itensAtuais.filter(item => item.id !== id));
  }

  function attQuantidade(id, action) {
    setItensCarrinho(itensAtuais => {
      return itensAtuais.map(item => {
        if (item.id === id) {
          const novaQuantidade = action === 'aumentar' 
            ? item.quant + 1 
            : Math.max(1, item.quant - 1);
          
          return { ...item, quant: novaQuantidade };
        }
        return item;
      });
    });
  }

  const countCarrinho = itensCarrinho.reduce((acc, item) => acc + item.quant, 0);
  
  const valorTotal = itensCarrinho.reduce((acc, item) => acc + (item.preco * item.quant), 0);
  
  const valorOriginalTotal = itensCarrinho.reduce((acc, item) => {
    const original = item.precoOriginal ?? item.preco; 
    return acc + (original * item.quant);
  }, 0);
  
  const totalSalvo = valorOriginalTotal - valorTotal;

  return (
    <ContextoCarrinho.Provider value={{ 
      itensCarrinho, 
      addAoCarrinho, 
      removerDoCarrinho,
      attQuantidade, 
      countCarrinho,
      valorTotal,
      totalSalvo 
    }}>
      {children}
    </ContextoCarrinho.Provider>
  );
}

export const useCarrinho = () => useContext(ContextoCarrinho);
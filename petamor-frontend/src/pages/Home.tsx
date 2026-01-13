import { useEffect, useState } from 'react';
import { api } from '../Services/api.ts';
import './home.css';


interface ProdutoProps {
  id: string;
  nome: string;
  preco: string
}

export function Home() {
  const [produtos, setProdutos] = useState<ProdutoProps[]>([]);
  const [carrinho, setcarrinho] = useState<ProdutoProps[]>([])

  function adicionarAoCarrinho(item: ProdutoProps) {
    setcarrinho([...carrinho, item])
  }


  async function buscarProdutos() {
    try {
      const resposta = await api.get('/VisualizarProduto'); // Sua rota do back
      console.log("Dados recebidos do BACKEND", resposta.data);
      setProdutos(resposta.data);

    } catch (err) {
      console.error("Erro na chamda da API", err);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className='container'>
      <header className="header">
        <h1>PetAmor - PetShop</h1>
        <p>Tudo que precisar pode contar. Funcionamos 24h</p>
      </header>


      {/* SEÇÃO DOS PRODUTOS */}
      <main className="main-content">
        <section className="grid-layout">
          {produtos.length === 0 ? (
            <p>Carregando produtos ou banco vazio...</p>
          ) : (
            produtos.map((item) => (
              <div key={item.id} className="product-card">
                {/* Imagem da logo*/}
                <img src="https://cdn-icons-png.flaticon.com/512/620/620851.png" alt={item.nome} />
                
            
                <h3>{item.nome}</h3>
                <p>R$ {item.preco}</p>
                <button className="btn-buy" onClick={() => adicionarAoCarrinho(item)}>
                  Comprar
                </button>
              </div>
            ))
          )}
        </section>

        <aside className="cart-sidebar">
          <h2> Meu carrinho de compras</h2>
          {carrinho.length === 0 ? (
            <p style={{color: '#999', textAlign: 'center'}}> O Carrinho está vazio </p>
          ) : (
            <> 
            {carrinho.map((item, index) => (
              <div key={index} className="cart-item">
                <span>{item.nome}</span>
               <strong> R$ {item.preco}</strong>
              </div>
            ))}
            <div style={{marginTop: '20px', textAlign: 'right'}}>
                <h3> Total: R$ {
                    carrinho.reduce((acc, item) => acc + Number(item.preco), 0).toFixed(2)}
                </h3>
            </div>

            </>
          )}
  
          <button className='btn-finish'>Finalizar Compra</button>
        </aside>
      </main>
    </div>
  )
}
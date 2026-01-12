import { useEffect, useState } from 'react';
import { api} from '../Services/api.ts';
import './home.css';


interface ProdutoProps {
    id: string;
    nome: string;
    preco: string
}

export function Home() {
    const [produtos, setProdutos] = useState<ProdutoProps[]>([]);
    const [carrinho,setcarrinho] = useState<ProdutoProps[]>([])

    function adicionarAoCarrinho(item: ProdutoProps) {
        setcarrinho([...carrinho, item])
    }
   

    async function buscarProdutos() {
         try {
        const resposta = await api.get('/VisualizarProduto'); // Sua rota do back
        console.log("Dados recebidos do BACKEND", resposta.data);
        setProdutos(resposta.data);
        
      }  catch (err) {
            console.error("Erro na chamda da API", err);
        }
        }
    
            useEffect(() => {
             buscarProdutos();
    }, []);

    return (
        <div className='container'>
            <header className="header">
                <h1>PetAmor - Loja</h1>
            </header>

            <main className="main-content">
  {/* SEÇÃO DOS PRODUTOS */}
  <section className="grid-layout">
    {produtos.length === 0 ? (
      <p>Carregando produtos ou banco vazio...</p>
    ) : (
      produtos.map((item) => (
        <div key={item.id} className="product-card">
          <img src="https://via.placeholder.com/150" alt={item.nome} />
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
                        <p> O Carrinho está vazio </p>
                    ) : (
                    carrinho.map((item, index) => (
                        <div key={index} style={{ borderBottom: '1px solid #eee', padding: '5px 0 '}}>
                            <p>{item.nome} - <strong> R$ {item.preco}</strong></p>
                        </div>

                    ))  
                    )}
                    <p style={{ marginTop: '10px' }}>Total de itens: {carrinho.length}</p>
                    <button className='btn-finish'>Finalizar Compra</button>
                </aside>
            </main>
        </div>
    )
}
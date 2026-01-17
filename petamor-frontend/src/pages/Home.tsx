import { useEffect, useState } from 'react';
import { api } from '../Services/api.ts';
import './home.css';

interface ProdutoProps {
  id: string;
  nome: string;
  preco: string;
}

export function Home() {
  const [produtos, setProdutos] = useState<ProdutoProps[]>([]);
  const [carrinho, setcarrinho] = useState<ProdutoProps[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  // 1. Funções do Carrinho
  function adicionarAoCarrinho(item: ProdutoProps) {
    setcarrinho([...carrinho, item]);
  }

  function removerDoCarrinho(indexParaRemover: number) {
    const novoCarrinho = carrinho.filter((_, index) => index !== indexParaRemover);
    setcarrinho(novoCarrinho);
  }

  // Buscar Produtos no Banco de Dados
  async function buscarProdutos() {
    try {
      const resposta = await api.get('/VisualizarProduto');
      setProdutos(resposta.data);
    } catch (err) {
      console.error("Erro na chamada da API", err);
    }
  }

  // Aciona o Modal de sucesso
  function finalizarPedido() {
    if (carrinho.length === 0) return;
    setMostrarModal(true);
  }

  // Limpa tudo e volta para a loja
  function fecharEsvaziar() {
    setcarrinho([]); // Limpar carrinho
    setMostrarModal(false); // Fecha modal
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className='container-full'>
      <header className="header">
        <h1>🐾 PetAmor - PetShop</h1>
        <p>Tudo que seu pet precisa, com carinho e cuidado 24h.</p>
      </header>

      <main className="main-content">
        {/* GRID DE PRODUTOS */}
        <section className="grid-layout">
          {produtos.length === 0 ? (
            <p className="loading-text">Buscando as melhores ofertas...</p>
          ) : (
            produtos.map((item) => (
              <div key={item.id} className="product-card">
                <img src="https://cdn-icons-png.flaticon.com/512/620/620851.png" alt={item.nome} />
                
                <h3>{item.nome}</h3>
                <p className="product-price">R$ {item.preco}</p>
                
                <div className="card-buttons">
                  <button className="btn-buy" onClick={() => adicionarAoCarrinho(item)}>
                    Comprar 🛒
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* CARRINHO LATERAL */}
        <aside className="cart-sidebar">
          <h2>Meu Carrinho</h2>
          {carrinho.length === 0 ? (
            <p className="empty-cart">Seu carrinho está vazio.</p>
          ) : (
            <>
              <div className="cart-items-list">
                {carrinho.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="item-details">
                      <span>{item.nome}</span>
                      <strong>R$ {item.preco}</strong>
                    </div>
                    <button className="btn-remove-item" onClick={() => removerDoCarrinho(index)}>✕</button>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Total: R$ {carrinho.reduce((acc, item) => acc + Number(item.preco), 0).toFixed(2)}</h3>
              </div>
            </>
          )}
          {/* Botão que aciona a função de finalizar */}
          <button className='btn-finish' onClick={finalizarPedido} disabled={carrinho.length === 0}>
            Finalizar pedido
          </button>
        </aside>
      </main>

      {/* MODAL DE SUCESSO */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">✅</div>
            <h2>Pedido Realizado com sucesso!</h2>
            <p>Obrigado por comprar na <strong>PetAmor</strong>. Veja o resumo:</p>

            <div className="modal-summary-list">
              {carrinho.map((item, index) => (
                <div key={index} className="summary-item">
                  {/* Span- Conteiner linear, usado igual a div, mas div ocupa espaço*/}
                  <span>{item.nome}</span> 
                  {/*strong- Além negrito o texto, apresenta importancia para o site - Diferente do <b> Negrito apenas </b>*/}
                  <strong>R$ {item.preco}</strong> 
                </div>
              ))}
            </div>

            <hr /> {/* Separação horizontal por uma linha */}
            
            <div className="summary-total">
              {/* ACC= Acumulador ou seja guarda + Adiciona outro item a conta, iniciar em 0, aloca o valor no acc e guarda o proximo valor, e vai acumulando para fazer a soma */}
              <strong>Total: R$ {carrinho.reduce((acc, item) => acc + Number(item.preco), 0).toFixed(2)}</strong>
            </div>

            <button className="btn-close-modal" onClick={fecharEsvaziar}>
              Continuar Comprando
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
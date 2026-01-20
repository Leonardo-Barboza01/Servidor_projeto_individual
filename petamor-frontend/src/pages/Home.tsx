import { useEffect, useState } from 'react';
import { api } from '../Services/api.ts';
import { Search, ShoppingCart, Phone, User, Instagram, Facebook, Youtube } from 'lucide-react'; 
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
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  function adicionarAoCarrinho(item: ProdutoProps) {
    setcarrinho([...carrinho, item]);
    setCarrinhoAberto(true); // Abre o carrinho automaticamente ao adicionar
  }

  function removerDoCarrinho(indexParaRemover: number) {
    const novoCarrinho = carrinho.filter((_, index) => index !== indexParaRemover);
    setcarrinho(novoCarrinho);
  }

  async function buscarProdutos() {
    try {
      const resposta = await api.get('/VisualizarProduto');
      setProdutos(resposta.data);
    } catch (err) {
      console.error("Erro na chamada da API", err);
    }
  }

  function finalizarPedido() {
    if (carrinho.length === 0) return;
    setMostrarModal(true);
    setCarrinhoAberto(false);
  }

  function fecharEsvaziar() {
    setcarrinho([]);
    setMostrarModal(false);
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className='container-full'>
      {/* 1. BARRA DE AVISOS (TOP BAR) */}
      <div className="top-bar">
        <span>PEÇA HOJE - ENVIO GRÁTIS</span>
        <div className="top-bar-links">
          <span>FALE PELO WHATSAPP</span>
          <span>TIRE SUAS DÚVIDAS</span>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL */}
      <header className="main-header">
        <div className="header-top">
          <div className="logo_principal">
            <img src="/imagem/logo_petAmor.png" alt="logo PetAmor" />
            <div className="logo-text">
              <h1>PetAmor</h1>
              <p>Preferido dos Pets</p>
            </div>
          </div>

          <div className="search-box">
            <input type="text" placeholder="Pesquisar..." />
            <button><Search size={18} /></button>
          </div>

          <div className="header-contact">
             <div className="contact-info">
                <span>Ligue</span>
                <strong>(11) 3456-7890</strong>
             </div>
          </div>
        </div>

        {/* 3. MENU DE CATEGORIAS */}
        <nav className="nav-categories">
          <ul className="cat-list">
            <li>LOJA</li>
            <li>CÃES</li>
            <li>GATOS</li>
            <li>PÁSSAROS</li>
            <li>PEIXES</li>
            <li>PEQUENINOS</li>
            <li>RÉPTEIS</li>
            <li>CONTATO</li>
          </ul>
          <div className="nav-social">
            <Facebook size={18} />
            <Youtube size={18} />
            <Instagram size={18} />
            <User size={18} />
            <span className="login-text">Login</span>
            <div className="cart-trigger" onClick={() => setCarrinhoAberto(true)}>
               <ShoppingCart size={22} />
               <span className="cart-count">{carrinho.length}</span>
            </div>
          </div>
        </nav>
      </header>

      {/* 4. CONTEÚDO PRINCIPAL (BANNER + PRODUTOS) */}
      <main className="main-content">
        <div className="promo-banner">
            <div className="banner-content">
                <h2>Bem-vindos à Nossa Loja Pet</h2>
                <button>Comprar Agora</button>
            </div>
            <img src="https://mimus.com.br/wp-content/uploads/2021/08/banner-home.png" alt="Banner Pets" className="banner-img" />
        </div>
         <div className="products-section-title">
             <p> Confira Nossos Produtos </p>
         </div>
        <section className="grid-layout">

          {produtos.map((item) => (
            <div key={item.id} className="product-card">
              <img src="https://cdn-icons-png.flaticon.com/512/620/620851.png" alt={item.nome} />
              <h3>{item.nome}</h3>
              <p className="product-price">R$ {item.preco}</p>
              <button className="btn-buy" onClick={() => adicionarAoCarrinho(item)}>
                Comprar 🛒
              </button>
            </div>
          ))}
        </section>
      </main>

      {/* 5. OVERLAY E CARRINHO LATERAL (DRAWER) */}
      {carrinhoAberto && <div className="overlay" onClick={() => setCarrinhoAberto(false)}></div>}
      
      <aside className={`cart-drawer ${carrinhoAberto ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Meu Carrinho</h2>
          <button onClick={() => setCarrinhoAberto(false)}>✕</button>
        </div>
        
        <div className="drawer-items">
          {carrinho.length === 0 ? <p>Vazio...</p> : carrinho.map((item, index) => (
            <div key={index} className="cart-item-drawer">
              <span>{item.nome}</span>
              <strong>R$ {item.preco}</strong>
              <button onClick={() => removerDoCarrinho(index)}>🗑️</button>
            </div>
          ))}
        </div>

        <div className="drawer-footer">
          <h3>Total: R$ {carrinho.reduce((acc, item) => acc + Number(item.preco), 0).toFixed(2)}</h3>
          <button className='btn-finish' onClick={finalizarPedido}>Finalizar Pedido</button>
        </div>
      </aside>

      {/* MODAL DE SUCESSO (MANTIDO) */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">✅</div>
            <h2>Pedido Realizado!</h2>
            <button className="btn-close-modal" onClick={fecharEsvaziar}>Continuar</button>
          </div>
        </div>
      )}
    </div>
  );
}
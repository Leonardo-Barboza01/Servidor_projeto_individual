import { useEffect, useState, useRef } from 'react'; // Adicionei useRef para as setas funcionarem
import { api } from '../Services/api.ts';
import { Search, ShoppingCart, Phone, User, Instagram, Facebook, Youtube, ChevronLeft, ChevronRight } from 'lucide-react'; 
import logo from '../imagem/logo_petAmor.png';
import banner_header from '../imagem/gato-cachorro.jpg';
import imgRacao from '../imagem/Coleira.jpg';
import imgBola from '../imagem/bola_tenis.png';
import pacoteRacaoDog from '../imagem/pacote_racao_dog.jpg';
import imgColeira from '../imagem/pote_gato.jpg';
import pacoteRacaoCat from '../imagem/racao_gato.jpg';
import './home.css';

interface ProdutoProps {
  id: string;
  nome: string;
  preco: string;
  imagem: string;
}

export function Home() {
  const [produtos, setProdutos] = useState<ProdutoProps[]>([]);
  const [carrinho, setcarrinho] = useState<ProdutoProps[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  // Referência para o carrossel rolar
  const carrosselRef = useRef<HTMLDivElement>(null);

  function adicionarAoCarrinho(item: ProdutoProps) {
    setcarrinho([...carrinho, item]);
    setCarrinhoAberto(true);
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

  // Função para mover o carrossel nas setas
  const scroll = (scrollOffset: number) => {
    if (carrosselRef.current) {
      carrosselRef.current.scrollLeft += scrollOffset;
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  // Mapeamento dos produtos (A LÓGICA QUE FALTAVA)
  const fotosProdutos: Record<string, string> = {
    'Ração para cães': pacoteRacaoDog,
    'Ração para gatos': pacoteRacaoCat,
    'Brinquedo bola de tênis': imgBola,
    'Coleira para pets': imgColeira,
    'Pote de comida para gatos': imgRacao,
  };

  return (
    <div className='container-full'>
      {/* 1. BARRA DE AVISOS */}
      <div className="top-bar">
        <span>PEÇA HOJE - ENVIO GRÁTIS</span>
        <div className="top-bar-links">
          <span>FALE PELO WHATSAPP</span>
          <span>TIRE SUAS DÚVIDAS</span>
        </div>
      </div>

      {/* 2. HEADER */}
      <header className="main-header">
        <div className="header-top">
          <div className="logo_principal">
            <img src={logo} alt="logo PetAmor" />
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
            <Phone size={18} />
            <User size={18} />
            <span className="login-text">Login</span>
            <div className="cart-trigger" onClick={() => setCarrinhoAberto(true)}>
               <ShoppingCart size={22} />
               <span className="cart-count">{carrinho.length}</span>
            </div>
          </div>
        </nav>
      </header>

      {/* 4. CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        <div className="promo-banner">
            <div className="banner-content">
              <div className="banner-box">
                <h2>Bem-vindos à Nossa Loja Pet</h2>
              </div>
            </div>
              <div className="banner-header">
                <img src={banner_header} alt="Banner-Pets" />
              </div> 
        </div>
        
        <div className="products-section-title">
             <p> Confira Nossos Produtos </p>
        </div>

        {/* --- CARROSSEL COM AS IMAGENS E SETAS --- */}
        <div className="carousel-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          
          <button className="arrow-btn left" onClick={() => scroll(-300)}>
            <ChevronLeft size={30} />
          </button>

          <section className="grid-layout" ref={carrosselRef}>
            {produtos.map((item) => {
              // AQUI ACONTECE A MÁGICA:
              // Ele pega a imagem do dicionário baseado no nome que veio do banco.
              // Se o nome não bater exatamente, ele usa a logo como reserva.
              const imagemParaExibir = fotosProdutos[item.nome] || logo;

              return (
                <div key={item.id} className="product-card">
                  <img src={imagemParaExibir} alt={item.nome} />
                  <h3>{item.nome}</h3>
                  <p className="product-price">R$ {item.preco}</p>
                  <button className="btn-buy" onClick={() => adicionarAoCarrinho(item)}>
                    Comprar 🛒
                  </button>
                </div>
              );
            })}
          </section>

          <button className="arrow-btn right" onClick={() => scroll(300)}>
            <ChevronRight size={30} />
          </button>

        </div>
      </main>

      {/* 5. CARRINHO LATERAL */}
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

      {/* MODAL DE SUCESSO */}
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
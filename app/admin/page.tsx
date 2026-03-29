import { cookies } from 'next/headers';
import { createProduct, loginAdmin, logoutAdmin, updateConfig } from './actions';
import { getProducts, getSiteConfig } from '@/lib/data';

const ADMIN_COOKIE = 'murtikar-admin-auth';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get(ADMIN_COOKIE)?.value === 'ok';
  const [products, config] = isAuthed ? await Promise.all([getProducts(), getSiteConfig()]) : [[], null];

  if (!isAuthed) {
    return (
      <main className="section">
        <div className="container" style={{ maxWidth: 450 }}>
          <h1>Admin Panel Login</h1>
          <form action={loginAdmin}>
            <label htmlFor="password">Admin password</label>
            <input id="password" name="password" type="password" required />
            <button className="btn" type="submit">
              Login
            </button>
          </form>
          <p style={{ fontSize: 12 }}>Set ADMIN_PANEL_PASSWORD in your .env.local file.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Owner Admin Panel</h1>
          <form action={logoutAdmin}>
            <button className="btn" type="submit">
              Logout
            </button>
          </form>
        </div>

        <div className="admin-layout">
          <section className="card" style={{ padding: '1rem' }}>
            <h2>Add Product</h2>
            <form action={createProduct}>
              <label>Title</label>
              <input name="title" required />
              <label>Slug</label>
              <input name="slug" required placeholder="e.g. love-stone-carving" />
              <label>Category</label>
              <input name="category" required />
              <label>Relationship</label>
              <input name="relationship" required />
              <label>Motto</label>
              <input name="motto" required />
              <label>Image URL</label>
              <input name="image_url" required />
              <label>Story</label>
              <textarea name="story" rows={3} required />
              <label>Why buy this</label>
              <textarea name="why_buy" rows={3} required />
              <label>Base price</label>
              <input name="base_price" type="number" min="0" step="0.01" required />
              <label>
                <input name="show_price" type="checkbox" /> Show price on product page
              </label>
              <label>
                <input name="customizable" type="checkbox" defaultChecked /> Customizable
              </label>
              <button className="btn" type="submit">
                Create Product
              </button>
            </form>
          </section>

          <section className="card" style={{ padding: '1rem' }}>
            <h2>Homepage Config</h2>
            {config ? (
              <form action={updateConfig}>
                <input type="hidden" name="id" value={config.id} />
                <label>Hero title</label>
                <input name="hero_title" defaultValue={config.hero_title} required />
                <label>Hero subtitle</label>
                <textarea name="hero_subtitle" rows={3} defaultValue={config.hero_subtitle} required />
                <label>WhatsApp link</label>
                <input name="whatsapp_link" defaultValue={config.whatsapp_link} required />
                <label>Trust badges (one per line)</label>
                <textarea name="trust_badges" rows={4} defaultValue={config.trust_badges.join('\n')} required />
                <button className="btn" type="submit">
                  Save Config
                </button>
              </form>
            ) : (
              <p>Create one row in <code>site_config</code> table, then refresh this page.</p>
            )}
          </section>
        </div>

        <section className="section">
          <h2>Existing Products</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.title} ({product.slug})
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

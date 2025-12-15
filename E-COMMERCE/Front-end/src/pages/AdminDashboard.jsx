import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const username = user?.name || 'Admin';

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm">
          Welcome back, <span className="font-semibold">{username}</span>
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 mt-6 md:grid-cols-3">
        {/* Quick stats (dummy for now, you can wire to backend later) */}
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <h2 className="text-sm text-gray-400 mb-1">Total Products</h2>
          <p className="text-3xl font-bold">--</p>
          <p className="text-xs text-gray-500 mt-1">
            Connect to your backend count later.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <h2 className="text-sm text-gray-400 mb-1">Total Orders</h2>
          <p className="text-3xl font-bold">--</p>
          <p className="text-xs text-gray-500 mt-1">
            Show total and status breakdown here.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <h2 className="text-sm text-gray-400 mb-1">Revenue</h2>
          <p className="text-3xl font-bold">₹ --</p>
          <p className="text-xs text-gray-500 mt-1">
            Wire to your orders API later.
          </p>
        </div>
      </div>

      {/* Management cards */}
      <div className="max-w-6xl mx-auto grid gap-6 mt-8 md:grid-cols-2">
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Products</h2>
            <p className="text-sm text-gray-400 mb-4">
              Add, edit, or remove products shown on the store.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/products"
              className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition"
            >
              Manage Products
            </Link>
            <Link
              to="/admin/products/new"
              className="px-4 py-2 rounded-lg border border-zinc-600 text-sm font-medium hover:bg-zinc-800 transition"
            >
              Add New Product
            </Link>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Orders</h2>
            <p className="text-sm text-gray-400 mb-4">
              View recent orders and update their status.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/orders"
              className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

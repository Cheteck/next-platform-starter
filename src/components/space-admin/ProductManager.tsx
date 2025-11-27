import { type FC, useState, useMemo } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, ShoppingBag, X, Eye } from 'lucide-react';
import { type Product, products as allProducts } from '@/lib/mock-data';
import { SellProductModal, SellProductData } from './SellProductModal';
import { CreateProductModal } from './modals/CreateProductModal';
import { EditProductModal } from './modals/EditProductModal';
import { ProductDetailsModal } from './modals/ProductDetailsModal';
import { ConfirmDialog } from '@/components/common';

interface ProductManagerProps {
    spaceId: string;
}

export const ProductManager: FC<ProductManagerProps> = ({ spaceId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCatalog, setShowCatalog] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProductToSell, setSelectedProductToSell] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Modal states
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const spaceProducts = allProducts.filter(p => p.spaceId === spaceId);
    const catalogProducts = allProducts.filter(p => p.spaceId !== spaceId);

    // Extract unique categories from catalog products
    const categories = useMemo(() => {
        const cats = new Set(catalogProducts.map(p => p.category));
        return Array.from(cats).sort();
    }, [catalogProducts]);

    const filteredSpaceProducts = spaceProducts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCatalogProducts = catalogProducts.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const handleSellClick = (product: Product) => {
        setSelectedProductToSell(product);
    };

    const handleSellConfirm = (data: SellProductData) => {
        if (selectedProductToSell) {
            console.log(`Adding product ${selectedProductToSell.title} to space ${spaceId}`, data);
            alert(`Produit "${selectedProductToSell.title}" ajouté à votre espace avec succès !\nPrix: ${data.price}€, Stock: ${data.stock}`);
            // Here you would make an API call to create the product link/copy
            setSelectedProductToSell(null);
            setShowCatalog(false);
        }
    };

    // Product modal handlers
    const handleCreateProduct = (data: any) => {
        console.log('Creating product:', data);
        alert('Produit créé avec succès !');
        // TODO: API call to create product
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleUpdateProduct = (data: any) => {
        console.log('Updating product:', selectedProduct?.id, data);
        alert('Produit mis à jour avec succès !');
        // TODO: API call to update product
    };

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        setShowDetailsModal(true);
    };

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product);
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        console.log('Deleting product:', selectedProduct?.id);
        alert(`Produit "${selectedProduct?.title}" supprimé avec succès !`);
        // TODO: API call to delete product
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    {showCatalog ? 'Catalogue Global' : 'Gestion des Produits'}
                </h2>
                <div className="flex gap-2">
                    {showCatalog ? (
                        <Button variant="outline" onClick={() => setShowCatalog(false)}>
                            Retour à mes produits
                        </Button>
                    ) : (
                        <>
                            <Button variant="outline" onClick={() => setShowCatalog(true)}>
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                Vendre un produit existant
                            </Button>
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => setShowCreateModal(true)}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Créer un produit
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Content Area */}
                <div className="flex-1">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder={showCatalog ? "Rechercher dans le catalogue..." : "Rechercher vos produits..."}
                                        className="pl-9 pr-4 py-2 w-full border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Button
                                    variant={showFilters ? "primary" : "outline"}
                                    className={showFilters ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200" : "text-gray-600"}
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filtres
                                </Button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix de base</th>
                                            {!showCatalog && (
                                                <>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                                </>
                                            )}
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {(showCatalog ? filteredCatalogProducts : filteredSpaceProducts).map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-100 overflow-hidden">
                                                            <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                            {!showCatalog && <div className="text-xs text-gray-500">{product.views} vues</div>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {product.category}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {product.price.toFixed(2)} €
                                                </td>
                                                {!showCatalog && (
                                                    <>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800' :
                                                                product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-red-100 text-red-800'
                                                                }`}>
                                                                {product.stock} unités
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <Badge variant={product.isActive ? 'success' : 'secondary'}>
                                                                {product.isActive ? 'Actif' : 'Inactif'}
                                                            </Badge>
                                                        </td>
                                                    </>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {showCatalog ? (
                                                        <Button
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700 text-white"
                                                            onClick={() => handleSellClick(product)}
                                                        >
                                                            <Plus className="h-4 w-4 mr-1" />
                                                            Vendre ceci
                                                        </Button>
                                                    ) : (
                                                        <div className="flex justify-end space-x-2">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                                                                onClick={() => handleViewDetails(product)}
                                                                title="Voir les détails"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                                                                onClick={() => handleEditProduct(product)}
                                                                title="Modifier"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                                                                onClick={() => handleDeleteClick(product)}
                                                                title="Supprimer"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {(showCatalog ? filteredCatalogProducts : filteredSpaceProducts).length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    <p>Aucun produit trouvé.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sidebar for Categories (Only in Catalog Mode) */}
                {showCatalog && showFilters && (
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <Card className="sticky top-6">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-900">Catégories</h3>
                                    {selectedCategory && (
                                        <button
                                            onClick={() => setSelectedCategory(null)}
                                            className="text-xs text-red-600 hover:text-red-800 flex items-center"
                                        >
                                            <X className="h-3 w-3 mr-1" />
                                            Effacer
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === null
                                            ? 'bg-blue-50 text-blue-700 font-medium'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        Toutes les catégories
                                    </button>
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === category
                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            {/* Modals */}
            <SellProductModal
                isOpen={!!selectedProductToSell}
                onClose={() => setSelectedProductToSell(null)}
                product={selectedProductToSell}
                onConfirm={handleSellConfirm}
            />

            <CreateProductModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onConfirm={handleCreateProduct}
            />

            <EditProductModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                product={selectedProduct}
                onConfirm={handleUpdateProduct}
            />

            <ProductDetailsModal
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                product={selectedProduct}
            />

            <ConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleConfirmDelete}
                title="Supprimer le produit"
                message={`Êtes-vous sûr de vouloir supprimer "${selectedProduct?.title}" ? Cette action est irréversible.`}
                confirmText="Supprimer"
                cancelText="Annuler"
                variant="danger"
            />
        </div>
    );
};

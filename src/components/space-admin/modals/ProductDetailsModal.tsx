import { type FC } from 'react';
import { Modal, Button, Badge } from '@/components/ui';
import { Product } from '@/lib/mock-data';
import { Package, DollarSign, Eye, ShoppingCart } from 'lucide-react';

interface ProductDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

export const ProductDetailsModal: FC<ProductDetailsModalProps> = ({ isOpen, onClose, product }) => {
    if (!product) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Détails du produit">
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                        <p className="text-gray-600 mt-1">{product.category}</p>
                        <div className="flex gap-2 mt-2">
                            <Badge variant={product.isActive ? 'success' : 'secondary'}>
                                {product.isActive ? 'Actif' : 'Inactif'}
                            </Badge>
                            <Badge variant="outline">{product.condition}</Badge>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <DollarSign className="w-6 h-6 mx-auto text-green-600 mb-2" />
                        <p className="text-2xl font-bold text-gray-900">{product.price.toFixed(2)} €</p>
                        <p className="text-xs text-gray-600">Prix</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Package className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                        <p className="text-2xl font-bold text-gray-900">{product.stock}</p>
                        <p className="text-xs text-gray-600">Stock</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Eye className="w-6 h-6 mx-auto text-purple-600 mb-2" />
                        <p className="text-2xl font-bold text-gray-900">{product.views}</p>
                        <p className="text-xs text-gray-600">Vues</p>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>Fermer</Button>
                    <Button>Modifier</Button>
                </div>
            </div>
        </Modal>
    );
};

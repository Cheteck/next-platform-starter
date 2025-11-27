import React, { useState, useEffect } from 'react';
import { Modal, Button, FormField, Input, Textarea } from '@/components/ui';
import { Product } from '@/lib/mock-data';

interface SellProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onConfirm: (data: SellProductData) => void;
}

export interface SellProductData {
    price: number;
    stock: number;
    condition: string;
    note: string;
}

export const SellProductModal: React.FC<SellProductModalProps> = ({
    isOpen,
    onClose,
    product,
    onConfirm,
}) => {
    const [price, setPrice] = useState<string>('');
    const [stock, setStock] = useState<string>('1');
    const [condition, setCondition] = useState<string>('Neuf');
    const [note, setNote] = useState<string>('');

    useEffect(() => {
        if (product) {
            setPrice(product.price.toString());
            setCondition(product.condition);
            setStock('1');
            setNote('');
        }
    }, [product]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({
            price: parseFloat(price) || 0,
            stock: parseInt(stock) || 0,
            condition,
            note,
        });
        onClose();
    };

    if (!product) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Vendre : ${product.title}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md mb-4 flex items-center gap-4">
                    <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-200 overflow-hidden">
                        <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">{product.title}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="text-sm font-medium text-blue-600">Prix de référence: {product.price}€</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Votre Prix (€)" required>
                        <Input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={setPrice}
                            required
                        />
                    </FormField>

                    <FormField label="Quantité en Stock" required>
                        <Input
                            type="number"
                            min="1"
                            value={stock}
                            onChange={setStock}
                            required
                        />
                    </FormField>
                </div>

                <FormField label="État du produit">
                    <select
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                    >
                        <option value="Neuf">Neuf</option>
                        <option value="Comme neuf">Comme neuf</option>
                        <option value="Bon état">Bon état</option>
                        <option value="Usé">Usé</option>
                    </select>
                </FormField>

                <FormField label="Note interne (optionnel)">
                    <Textarea
                        placeholder="Notes pour votre gestion interne..."
                        value={note}
                        onChange={setNote}
                        rows={3}
                    />
                </FormField>

                <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button type="submit" variant="primary">
                        Confirmer la mise en vente
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

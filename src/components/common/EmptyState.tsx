import { type FC, type ReactNode } from 'react';
import { Package, Inbox } from 'lucide-react';
import { Button } from '@/components/ui';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState: FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    actionLabel,
    onAction
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-gray-400 mb-4">
                {icon || <Inbox className="w-16 h-16" />}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>
            {actionLabel && onAction && (
                <Button onClick={onAction}>{actionLabel}</Button>
            )}
        </div>
    );
};

// src/components/InventoryPage.tsx

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Switch } from "./ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, Edit, Trash2, Package, AlertTriangle, Grid3X3, List, CheckCircle, X, MoreVertical,
  Factory, CalendarDays, Coins, ChevronDown, BarChart2, Check, Copy
} from "lucide-react";


interface InventoryItem {
  id: string;
  name: string;
  nameHindi: string;
  category: 'fertilizer' | 'seeds' | 'pesticide' | 'equipment' | 'other';
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  lastUpdated: string;
  cost: number;
  supplier: string;
  expiryDate?: string;
}

const CATEGORIES_CONFIG = {
    fertilizer: { label: 'उर्वरक', icon: '🌱', color: 'bg-green-100 text-green-800', borderColor: 'border-green-300' },
    seeds: { label: 'बीज', icon: '🌾', color: 'bg-yellow-100 text-yellow-800', borderColor: 'border-yellow-300' },
    pesticide: { label: 'कीटनाशक', icon: '🐛', color: 'bg-red-100 text-red-800', borderColor: 'border-red-300' },
    equipment: { label: 'उपकरण', icon: '🚜', color: 'bg-blue-100 text-blue-800', borderColor: 'border-blue-300' },
    other: { label: 'अन्य', icon: '📦', color: 'bg-gray-100 text-gray-800', borderColor: 'border-gray-300' }
};

const INITIAL_INVENTORY_DATA: InventoryItem[] = [
    { id: '1', name: 'DAP Fertilizer', nameHindi: 'डीएपी उर्वरक', category: 'fertilizer', quantity: 5, unit: 'बैग', lowStockThreshold: 10, lastUpdated: '2024-01-15', cost: 1200, supplier: 'राज एग्रो सेंटर', expiryDate: '2025-06-30' },
    { id: '2', name: 'Urea', nameHindi: 'यूरिया', category: 'fertilizer', quantity: 15, unit: 'बैग', lowStockThreshold: 8, lastUpdated: '2024-01-12', cost: 280, supplier: 'किसान भंडार' },
    { id: '3', name: 'Soybean Seeds', nameHindi: 'सोयाबीन बीज', category: 'seeds', quantity: 2, unit: 'kg', lowStockThreshold: 5, lastUpdated: '2024-01-10', cost: 120, supplier: 'महिको सीड्स' },
    { id: '4', name: 'Pesticide Spray', nameHindi: 'कीटनाशक स्प्रे', category: 'pesticide', quantity: 8, unit: 'लीटर', lowStockThreshold: 3, lastUpdated: '2024-01-08', cost: 450, supplier: 'बायर एग्रो', expiryDate: '2024-12-31' },
    { id: '5', name: 'Water Pump', nameHindi: 'पानी का पंप', category: 'equipment', quantity: 1, unit: 'पीस', lowStockThreshold: 1, lastUpdated: '2024-01-05', cost: 15000, supplier: 'टाटा एग्रिको' },
    { id: '6', name: 'Tractor', nameHindi: 'ट्रैक्टर', category: 'equipment', quantity: 1, unit: 'पीस', lowStockThreshold: 1, lastUpdated: '2024-01-20', cost: 550000, supplier: 'महिंद्रा' },
    { id: '7', name: 'Wheat Seeds', nameHindi: 'गेहूं के बीज', category: 'seeds', quantity: 50, unit: 'kg', lowStockThreshold: 20, lastUpdated: '2024-01-18', cost: 40, supplier: 'राष्ट्रीय बीज निगम' },
    { id: '8', name: 'Organic Manure', nameHindi: 'जैविक खाद', category: 'fertilizer', quantity: 20, unit: 'बैग', lowStockThreshold: 15, lastUpdated: '2024-01-16', cost: 350, supplier: 'स्थानीय सहकारी' },
];

type ToastMessage = {
  id: number;
  message: string;
  type: 'success' | 'error';
};

// ============================================================================
// 1. STATS & CHART COMPONENTS
// ============================================================================

const InventoryStats = ({ items }: { items: InventoryItem[] }) => {
  const lowStockCount = items.filter(item => item.quantity <= item.lowStockThreshold).length;
  const totalValue = items.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
  const categoryCount = new Set(items.map(item => item.category)).size;

  const stats = [
    { label: 'कुल आइटम', value: items.length, icon: Package, color: 'text-primary' },
    { label: 'कम स्टॉक', value: lowStockCount, icon: AlertTriangle, color: 'text-red-500' },
    { label: 'कुल मूल्य (₹)', value: totalValue.toLocaleString(), icon: Coins, color: 'text-green-600' },
    { label: 'श्रेणियां', value: categoryCount, icon: Grid3X3, color: 'text-blue-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

const CategoryChart = ({ items }: { items: InventoryItem[] }) => {
  const categoryData = useMemo(() => {
    const counts = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const maxCount = Math.max(...Object.values(counts), 0);
    return Object.entries(counts).map(([key, value]) => ({
      ...CATEGORIES_CONFIG[key as keyof typeof CATEGORIES_CONFIG],
      count: value,
      percentage: maxCount > 0 ? (value / maxCount) * 100 : 0,
    }));
  }, [items]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center"><BarChart2 className="mr-2 h-5 w-5" />श्रेणी वितरण</CardTitle>
        <CardDescription>आपकी इन्वेंट्री में आइटमों का श्रेणी-वार विभाजन।</CardDescription>
      </CardHeader>
      <CardContent>
        {categoryData.length > 0 ? (
          <div className="space-y-4">
            {categoryData.map(cat => (
              <div key={cat.label} className="flex items-center gap-4">
                <span className="text-lg w-8 text-center">{cat.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{cat.label}</span>
                    <span className="text-gray-600">{cat.count} आइटम</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${cat.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500 text-center py-4">चार्ट प्रदर्शित करने के लिए कोई आइटम नहीं है।</p>}
      </CardContent>
    </Card>
  );
};

// ============================================================================
// 2. TOOLBAR & FILTERING COMPONENTS
// ============================================================================

const InventoryToolbar = ({ filters, onFilterChange, onAddItem, onViewChange }: any) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);

  return (
    <Card className="overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <div className="relative flex-grow max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="आइटम खोजें..."
              value={filters.searchTerm}
              onChange={(e) => onFilterChange('searchTerm', e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="ghost" onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}>
            फ़िल्टर
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isFilterPanelOpen ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isFilterPanelOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                <Select value={filters.filterCategory} onValueChange={(val) => onFilterChange('filterCategory', val)}>
                  <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="श्रेणी चुनें" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">सभी श्रेणियां</SelectItem>
                    {Object.entries(CATEGORIES_CONFIG).map(([key, cat]) => (<SelectItem key={key} value={key}>{cat.label}</SelectItem>))}
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Switch id="low-stock" checked={filters.showLowStockOnly} onCheckedChange={(val) => onFilterChange('showLowStockOnly', val)} />
                  <Label htmlFor="low-stock">केवल कम स्टॉक दिखाएं</Label>
                </div>
              </div>
              <div className="flex items-center space-x-2 self-end">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button variant={filters.viewMode === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => onViewChange('grid')}><Grid3X3 className="w-4 h-4" /></Button>
                  <Button variant={filters.viewMode === 'table' ? 'secondary' : 'ghost'} size="sm" onClick={() => onViewChange('table')}><List className="w-4 h-4" /></Button>
                </div>
                <Button onClick={onAddItem}><Plus className="w-4 h-4 mr-2" /> नया आइटम जोड़ें</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};


// ============================================================================
// 3. ITEM DISPLAY COMPONENTS (GRID & TABLE)
// ============================================================================

const InventoryItemCard = ({ item, onEdit, onDelete }: { item: InventoryItem; onEdit: () => void; onDelete: () => void; }) => {
  const isLowStock = item.quantity <= item.lowStockThreshold;
  const stockPercentage = Math.min((item.quantity / (item.lowStockThreshold * 2)) * 100, 100);
  const category = CATEGORIES_CONFIG[item.category];

  const getStockColor = () => {
    if (isLowStock) return 'bg-red-500';
    if (stockPercentage < 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
  <Card className={`h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border-2 ${isLowStock ? category.borderColor : 'border-transparent'}`}>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <CardTitle className="text-lg font-bold">{item.nameHindi}</CardTitle>
            <CardDescription>{item.name}</CardDescription>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
              <Edit className="w-4 h-4 mr-2" /> संपादित करें
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600 cursor-pointer">
              <Trash2 className="w-4 h-4 mr-2" /> हटाएं
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>

    <CardContent className="flex-grow space-y-4">
      <div>
        <div className="flex justify-between items-baseline mb-1">
          <p className="text-sm font-medium text-gray-700">स्टॉक स्तर</p>
          <p className={`text-2xl font-bold ${isLowStock ? 'text-red-600' : 'text-gray-800'}`}>
            {item.quantity} <span className="text-base font-normal text-gray-500">{item.unit}</span>
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${getStockColor()}`}
            style={{ width: `${stockPercentage}%` }}
          ></div>
        </div>
        {isLowStock && (
          <p className="text-xs text-red-600 mt-1 flex items-center">
            <AlertTriangle className="w-3 h-3 mr-1" /> न्यूनतम सीमा ({item.lowStockThreshold} {item.unit}) से कम है
          </p>
        )}
      </div>

      <div className="space-y-2 text-sm border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 flex items-center">
            <Coins className="w-4 h-4 mr-2 text-gray-400" /> मूल्य (प्रति इकाई)
          </span>
          <span className="font-semibold text-gray-800">₹{item.cost.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 flex items-center">
            <Factory className="w-4 h-4 mr-2 text-gray-400" /> सप्लायर
          </span>
          <span className="font-semibold text-gray-800">{item.supplier}</span>
        </div>
        {item.expiryDate && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600 flex items-center">
              <CalendarDays className="w-4 h-4 mr-2 text-gray-400" /> समाप्ति तिथि
            </span>
            <span className="font-semibold text-gray-800">{item.expiryDate}</span>
          </div>
        )}
      </div>
    </CardContent>

    <CardFooter className="!pt-0">
      <Badge className={category.color}>{category.label}</Badge>
    </CardFooter>
  </Card>
);
};
const InventoryGrid = ({ items, onEdit, onDelete }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <AnimatePresence>
      {items.map((item: InventoryItem, index: number) => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, delay: 0.05 * index }}
        >
          <InventoryItemCard item={item} onEdit={() => onEdit(item)} onDelete={() => onDelete(item.id)} />
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

const InventoryTable = ({ items, onEdit, onDelete }: any) => (
  <Card>
    <Table>
      <TableHeader><TableRow><TableHead>आइटम</TableHead><TableHead>श्रेणी</TableHead><TableHead>मात्रा</TableHead><TableHead>मूल्य</TableHead><TableHead>सप्लायर</TableHead><TableHead>क्रियाएं</TableHead></TableRow></TableHeader>
      <TableBody>
        <AnimatePresence>
          {items.map((item: InventoryItem) => (
            <motion.tr
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={item.quantity <= item.lowStockThreshold ? 'bg-red-50' : ''}
            >
              <TableCell><div className="font-medium">{item.nameHindi}</div><div className="text-sm text-gray-500">{item.name}</div></TableCell>
              <TableCell><Badge className={CATEGORIES_CONFIG[item.category].color}>{CATEGORIES_CONFIG[item.category].label}</Badge></TableCell>
              <TableCell><span className={item.quantity <= item.lowStockThreshold ? 'text-red-600 font-semibold' : ''}>{item.quantity} {item.unit}</span></TableCell>
              <TableCell>₹{item.cost.toLocaleString()}</TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button variant="outline" size="icon" className="w-8 h-8" onClick={() => onEdit(item)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" className="w-8 h-8 text-red-600" onClick={() => onDelete(item.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  </Card>
);


// ============================================================================
// 4. FORM & MODAL COMPONENTS
// ============================================================================

const ItemForm = ({ initialData, onSubmit, onCancel }: any) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="nameHindi">हिंदी नाम</Label><Input id="nameHindi" value={formData.nameHindi} onChange={(e) => handleChange('nameHindi', e.target.value)} required /></div>
                <div><Label htmlFor="name">English Name</Label><Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} required /></div>
            </div>
            <div><Label>श्रेणी</Label><Select value={formData.category} onValueChange={(val) => handleChange('category', val)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.entries(CATEGORIES_CONFIG).map(([key, cat]) => (<SelectItem key={key} value={key}>{cat.label}</SelectItem>))}</SelectContent></Select></div>
            <div className="grid grid-cols-2 gap-4">
                <div><Label>मात्रा</Label><Input type="number" value={formData.quantity} onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)} /></div>
                <div><Label>इकाई</Label><Select value={formData.unit} onValueChange={(val) => handleChange('unit', val)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="kg">किलोग्राम</SelectItem><SelectItem value="बैग">बैग</SelectItem><SelectItem value="लीटर">लीटर</SelectItem><SelectItem value="पीस">पीस</SelectItem></SelectContent></Select></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div><Label>न्यूनतम स्टॉक सीमा</Label><Input type="number" value={formData.lowStockThreshold} onChange={(e) => handleChange('lowStockThreshold', parseInt(e.target.value) || 0)} /></div>
                <div><Label>मूल्य (प्रति इकाई)</Label><Input type="number" value={formData.cost} onChange={(e) => handleChange('cost', parseInt(e.target.value) || 0)} /></div>
            </div>
            <div><Label>सप्लायर</Label><Input value={formData.supplier} onChange={(e) => handleChange('supplier', e.target.value)} /></div>
            <div><Label>समाप्ति तिथि (वैकल्पिक)</Label><Input type="date" value={formData.expiryDate} onChange={(e) => handleChange('expiryDate', e.target.value)} /></div>
            <div className="flex space-x-2 pt-4">
                <Button type="submit" className="flex-1"><CheckCircle className="w-4 h-4 mr-2" /> सेव करें</Button>
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1"><X className="w-4 h-4 mr-2" /> रद्द करें</Button>
            </div>
        </form>
    );
};


// ============================================================================
// 5. TOAST NOTIFICATION COMPONENT
// ============================================================================

const Toast = ({ message, onDismiss }: { message: ToastMessage, onDismiss: () => void }) => {
    React.useEffect(() => {
        const timer = setTimeout(onDismiss, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            className={`fixed bottom-5 right-5 flex items-center p-4 rounded-lg shadow-lg text-white ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
            <Check className="mr-2" /> {message.message}
        </motion.div>
    );
};


// ============================================================================
// 6. MAIN INVENTORY PAGE COMPONENT
// ============================================================================

export function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY_DATA);
  const [filters, setFilters] = useState({
    searchTerm: "",
    filterCategory: "all",
    showLowStockOnly: false,
    viewMode: 'grid' as 'grid' | 'table'
  });
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const newToast = { id: Date.now(), message, type };
    setToasts(prev => [...prev, newToast]);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = item.nameHindi.toLowerCase().includes(filters.searchTerm.toLowerCase()) || item.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesCategory = filters.filterCategory === 'all' || item.category === filters.filterCategory;
      const matchesLowStock = !filters.showLowStockOnly || (item.quantity <= item.lowStockThreshold);
      return matchesSearch && matchesCategory && matchesLowStock;
    });
  }, [inventory, filters]);

  const resetFormState = { name: '', nameHindi: '', category: 'fertilizer' as const, quantity: 0, unit: 'kg', lowStockThreshold: 10, cost: 0, supplier: '', expiryDate: '' };

  const handleAddItem = (formData: Omit<InventoryItem, 'id' | 'lastUpdated'>) => {
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      ...formData,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setInventory(prev => [newItem, ...prev]);
    setIsAddModalOpen(false);
    addToast('आइटम सफलतापूर्वक जोड़ा गया!');
  };

  const handleEditItem = (formData: InventoryItem) => {
    setInventory(prev => prev.map(item => item.id === editingItem?.id ? { ...formData, lastUpdated: new Date().toISOString().split('T')[0] } : item));
    setEditingItem(null);
    addToast('आइटम सफलतापूर्वक अपडेट किया गया!');
  };

  const handleDeleteItem = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id));
    addToast('आइटम हटा दिया गया है!', 'error');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50">
            <AnimatePresence>
                {toasts.map(toast => <Toast key={toast.id} message={toast} onDismiss={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />)}
            </AnimatePresence>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="max-w-md"><DialogHeader><DialogTitle>नया आइटम जोड़ें</DialogTitle></DialogHeader><ItemForm initialData={resetFormState} onSubmit={handleAddItem} onCancel={() => setIsAddModalOpen(false)} /></DialogContent>
        </Dialog>

        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
            <DialogContent className="max-w-md"><DialogHeader><DialogTitle>आइटम संपादित करें</DialogTitle></DialogHeader>{editingItem && <ItemForm initialData={editingItem} onSubmit={handleEditItem} onCancel={() => setEditingItem(null)} />}</DialogContent>
        </Dialog>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins' }}>इन्वेंटरी प्रबंधन</h1>
                <p className="text-gray-600 mt-1">अपनी सभी कृषि सामग्री और उपकरणों को ट्रैक और प्रबंधित करें।</p>
            </header>

            <InventoryStats items={inventory} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <InventoryToolbar 
                        filters={filters} 
                        onFilterChange={handleFilterChange} 
                        onAddItem={() => setIsAddModalOpen(true)}
                        onViewChange={(mode: 'grid' | 'table') => handleFilterChange('viewMode', mode)}
                    />
                    {filteredInventory.length === 0 ? (
                        <Card className="text-center py-12">
                            <Package className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">कोई आइटम नहीं मिला</h3>
                            <p className="mt-1 text-sm text-gray-500">अपने फ़िल्टर समायोजित करें या एक नया आइटम जोड़ें।</p>
                        </Card>
                    ) : filters.viewMode === 'grid' ? (
                        <InventoryGrid items={filteredInventory} onEdit={setEditingItem} onDelete={handleDeleteItem} />
                    ) : (
                        <InventoryTable items={filteredInventory} onEdit={setEditingItem} onDelete={handleDeleteItem} />
                    )}
                </div>

                <div className="lg:col-span-1">
                    <CategoryChart items={inventory} />
                </div>
            </div>
        </motion.div>
    </div>
  );
}
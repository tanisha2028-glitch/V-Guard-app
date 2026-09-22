/**
 * V-Guard One — Unified Smart-Home, Product-Service & Partner Ecosystem
 * Multi-role prototype: Customer, Retailer, Distributor.
 * "Bring Home a Better Tomorrow"
 */

import React, { useState } from 'react';
import {
  AppRole,
  CustomerTab,
  RetailerTab,
  DistributorTab,
  RegisteredProduct,
  SmartDeviceState,
  SolarTelemetry,
  ServiceTicket,
  RetailerOrder,
  InventoryItem,
  CatalogItem,
} from './types';
import {
  SAMPLE_REGISTERED_PRODUCTS,
  SAMPLE_SMART_DEVICES,
  SAMPLE_SOLAR_TELEMETRY,
  SAMPLE_SERVICE_TICKETS,
  SAMPLE_RETAILER_ORDERS,
  SAMPLE_INVENTORY,
  FULL_CATALOG,
} from './data/mockData';

// Common Components
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { RoleSwitcher } from './components/common/RoleSwitcher';
import { AskVGuardModal } from './components/common/AskVGuardModal';
import { DemoJourneysModal } from './components/common/DemoJourneysModal';

// Customer Components & Modals
import { CustomerHome } from './components/customer/CustomerHome';
import { CustomerProducts } from './components/customer/CustomerProducts';
import { CustomerSolar } from './components/customer/CustomerSolar';
import { CustomerServices } from './components/customer/CustomerServices';
import { CustomerProfile } from './components/customer/CustomerProfile';
import { SmartControlsModal } from './components/customer/SmartControlsModal';
import { ProductDetailModal } from './components/customer/ProductDetailModal';
import { RegisterProductModal } from './components/customer/RegisterProductModal';

// Retailer Components & Modals
import { RetailerDashboard } from './components/retailer/RetailerDashboard';
import { RetailerCatalogue } from './components/retailer/RetailerCatalogue';
import { RetailerOrders } from './components/retailer/RetailerOrders';
import { RetailerOrderModal } from './components/retailer/RetailerOrderModal';
import { RetailerCustomerRegisterModal } from './components/retailer/RetailerCustomerRegisterModal';

// Distributor Components
import { DistributorDashboard } from './components/distributor/DistributorDashboard';
import { DistributorInventory } from './components/distributor/DistributorInventory';
import { DistributorOrders } from './components/distributor/DistributorOrders';
import { DistributorAnalytics } from './components/distributor/DistributorAnalytics';

export const App: React.FC = () => {
  // Global Role & Tabs State
  const [currentRole, setCurrentRole] = useState<AppRole>('customer');
  const [customerTab, setCustomerTab] = useState<CustomerTab>('home');
  const [retailerTab, setRetailerTab] = useState<RetailerTab>('dashboard');
  const [distributorTab, setDistributorTab] = useState<DistributorTab>('dashboard');

  // App Data State (interactive prototype states)
  const [registeredProducts, setRegisteredProducts] = useState<RegisteredProduct[]>(
    SAMPLE_REGISTERED_PRODUCTS
  );
  const [smartDevices, setSmartDevices] = useState<SmartDeviceState[]>(SAMPLE_SMART_DEVICES);
  const [solarData, setSolarData] = useState<SolarTelemetry>(SAMPLE_SOLAR_TELEMETRY);
  const [serviceTickets, setServiceTickets] = useState<ServiceTicket[]>(SAMPLE_SERVICE_TICKETS);
  const [retailerOrders, setRetailerOrders] = useState<RetailerOrder[]>(SAMPLE_RETAILER_ORDERS);
  const [inventory, setInventory] = useState<InventoryItem[]>(SAMPLE_INVENTORY);

  // Modal Visibility State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedSmartDevice, setSelectedSmartDevice] = useState<SmartDeviceState | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<RegisteredProduct | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRetailerOrderModalOpen, setIsRetailerOrderModalOpen] = useState(false);
  const [retailerOrderInitialItem, setRetailerOrderInitialItem] = useState<CatalogItem | undefined>(undefined);
  const [isRetailerCustRegModalOpen, setIsRetailerCustRegModalOpen] = useState(false);

  // Pre-filled service booking from AI or product action
  const [servicePrefillProduct, setServicePrefillProduct] = useState<string | undefined>(undefined);
  const [servicePrefillIssue, setServicePrefillIssue] = useState<string | undefined>(undefined);

  // Handlers for Smart Device state updates
  const handleUpdateSmartDevice = (id: string, updates: Partial<SmartDeviceState>) => {
    setSmartDevices((prev) =>
      prev.map((dev) => (dev.id === id ? { ...dev, ...updates } : dev))
    );
    if (selectedSmartDevice && selectedSmartDevice.id === id) {
      setSelectedSmartDevice((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  // Handlers for Customer Product Registration
  const handleRegisterProduct = (newProd: RegisteredProduct) => {
    setRegisteredProducts((prev) => [newProd, ...prev]);
  };

  // Handlers for Service Ticket creation
  const handleCreateTicket = (newTicket: ServiceTicket) => {
    setServiceTickets((prev) => [newTicket, ...prev]);
  };

  // Handlers for Retailer Orders
  const handlePlaceRetailerOrder = (newOrder: RetailerOrder) => {
    setRetailerOrders((prev) => [newOrder, ...prev]);
  };

  // Handlers for Distributor Actions
  const handleApproveOrder = (orderId: string) => {
    setRetailerOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Pending Dispatch' } : o))
    );
  };

  const handleDispatchOrder = (orderId: string) => {
    setRetailerOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Dispatched' } : o))
    );
  };

  const handleReorderInventory = (sku: string, addUnits: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.sku === sku ? { ...item, currentStock: item.currentStock + addUnits } : item
      )
    );
  };

  // Refresh solar telemetry simulation
  const handleRefreshSolar = () => {
    setSolarData((prev) => ({
      ...prev,
      currentGenerationKW: Number((3.6 + Math.random() * 1.2).toFixed(2)),
      householdLoadKW: Number((1.2 + Math.random() * 0.5).toFixed(2)),
      gridExportKW: Number((2.4 + Math.random() * 0.7).toFixed(2)),
    }));
  };

  // Action from AI or Product Card to jump to Service Booking
  const handleRaiseServiceForProduct = (product: RegisteredProduct, issue?: string) => {
    setCurrentRole('customer');
    setCustomerTab('services');
    setServicePrefillProduct(product.name);
    setServicePrefillIssue(issue || 'Preventive Maintenance Check');
  };

  // Handler for Demo Journey clicks (1 to 6)
  const handleSelectJourney = (journeyIndex: number) => {
    switch (journeyIndex) {
      case 1:
        // Journey 1: Customer controls smart geyser
        setCurrentRole('customer');
        setCustomerTab('home');
        setSelectedSmartDevice(smartDevices[0]); // Calino 25L IoT Smart Geyser
        break;
      case 2:
        // Journey 2: Customer checks solar generation and battery charge
        setCurrentRole('customer');
        setCustomerTab('solar');
        break;
      case 3:
        // Journey 3: Customer asks AI a product question & service support
        setIsAiModalOpen(true);
        break;
      case 4:
        // Journey 4: Customer finds product warranty & manual
        setCurrentRole('customer');
        setCustomerTab('products');
        setSelectedProductDetail(registeredProducts[0]);
        break;
      case 5:
        // Journey 5: Retailer searches catalogue, creates mock order, registers customer
        setCurrentRole('retailer');
        setRetailerTab('catalogue');
        setRetailerOrderInitialItem(FULL_CATALOG[0]);
        setIsRetailerOrderModalOpen(true);
        break;
      case 6:
        // Journey 6: Distributor reviews inventory, checks low stock, approves orders
        setCurrentRole('distributor');
        setDistributorTab('dashboard');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top App Header */}
      <Header
        role={currentRole}
        onOpenAskVGuard={() => setIsAiModalOpen(true)}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        activeServiceCount={serviceTickets.filter((t) => t.status !== 'Completed').length}
      />

      {/* Role Switcher Banner */}
      <RoleSwitcher
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        onOpenDemoTours={() => setIsDemoModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {/* =========================================================================
            ROLE 1: CUSTOMER VIEW
           ========================================================================= */}
        {currentRole === 'customer' && (
          <>
            {customerTab === 'home' && (
              <CustomerHome
                smartDevices={smartDevices}
                registeredProducts={registeredProducts}
                solarData={solarData}
                activeTickets={serviceTickets}
                onUpdateSmartDevice={(dev: SmartDeviceState) => handleUpdateSmartDevice(dev.id, dev)}
                onNavigateTab={(tab: CustomerTab) => setCustomerTab(tab)}
                onOpenSmartModal={(deviceId?: string) => {
                  const target = smartDevices.find((d) => d.id === deviceId) || smartDevices[0];
                  setSelectedSmartDevice(target);
                }}
                onOpenAskVGuard={() => setIsAiModalOpen(true)}
                onSelectProductDetail={(product: RegisteredProduct) => setSelectedProductDetail(product)}
                onOpenRegisterProductModal={() => setIsRegisterModalOpen(true)}
              />
            )}

            {customerTab === 'products' && (
              <CustomerProducts
                registeredProducts={registeredProducts}
                onSelectProductDetail={(product: RegisteredProduct) => setSelectedProductDetail(product)}
                onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
                onRaiseServiceForProduct={handleRaiseServiceForProduct}
              />
            )}

            {customerTab === 'solar' && (
              <CustomerSolar
                solarData={solarData}
                onRefreshTelemetry={handleRefreshSolar}
              />
            )}

            {customerTab === 'services' && (
              <CustomerServices
                registeredProducts={registeredProducts}
                activeTickets={serviceTickets}
                onCreateTicket={handleCreateTicket}
                initialPrefillProduct={servicePrefillProduct}
                initialPrefillIssue={servicePrefillIssue}
              />
            )}

            {customerTab === 'profile' && <CustomerProfile />}
          </>
        )}

        {/* =========================================================================
            ROLE 2: RETAILER VIEW
           ========================================================================= */}
        {currentRole === 'retailer' && (
          <>
            {retailerTab === 'dashboard' && (
              <RetailerDashboard
                orders={retailerOrders}
                onNavigateTab={(tab: RetailerTab) => setRetailerTab(tab)}
                onOpenOrderModal={() => {
                  setRetailerOrderInitialItem(FULL_CATALOG[0]);
                  setIsRetailerOrderModalOpen(true);
                }}
                onOpenCustomerRegisterModal={() => setIsRetailerCustRegModalOpen(true)}
              />
            )}

            {retailerTab === 'catalogue' && (
              <RetailerCatalogue
                onSelectItemForOrder={(item: CatalogItem) => {
                  setRetailerOrderInitialItem(item);
                  setIsRetailerOrderModalOpen(true);
                }}
              />
            )}

            {retailerTab === 'orders' && (
              <RetailerOrders
                orders={retailerOrders}
                onOpenOrderModal={() => {
                  setRetailerOrderInitialItem(FULL_CATALOG[0]);
                  setIsRetailerOrderModalOpen(true);
                }}
              />
            )}

            {retailerTab === 'support' && (
              <div className="max-w-4xl mx-auto px-4 pt-4 pb-20 space-y-4">
                <CustomerServices
                  registeredProducts={registeredProducts}
                  activeTickets={serviceTickets}
                  onCreateTicket={handleCreateTicket}
                  initialPrefillIssue="Retailer Installation Request"
                />
              </div>
            )}

            {retailerTab === 'profile' && (
              <div className="max-w-4xl mx-auto px-4 pt-4 pb-20">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 text-xs">
                  <h2 className="font-heading font-bold text-base text-slate-900">
                    Lakshmi Electricals & Appliances
                  </h2>
                  <p className="text-slate-500">
                    Authorized Retail Dealer • GSTIN: 32AABCU9603R1ZM • Code: RET-KER-KOCH-102
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                    <span>Depot Linkage</span>
                    <strong className="text-slate-800">Ernakulam Central Depot</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Credit Limit</span>
                    <strong className="text-emerald-700">₹15,00,000 (₹4.8L Utilized)</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rishta Dealer Coins</span>
                    <strong className="text-orange-600 font-bold">4,850 Coins</strong>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* =========================================================================
            ROLE 3: DISTRIBUTOR VIEW
           ========================================================================= */}
        {currentRole === 'distributor' && (
          <>
            {distributorTab === 'dashboard' && (
              <DistributorDashboard
                inventory={inventory}
                orders={retailerOrders}
                onNavigateTab={(tab: DistributorTab) => setDistributorTab(tab)}
                onApproveOrder={handleApproveOrder}
                onDispatchOrder={handleDispatchOrder}
              />
            )}

            {distributorTab === 'inventory' && (
              <DistributorInventory
                inventory={inventory}
                onReorderStock={handleReorderInventory}
              />
            )}

            {distributorTab === 'orders' && (
              <DistributorOrders
                orders={retailerOrders}
                onApproveOrder={handleApproveOrder}
                onDispatchOrder={handleDispatchOrder}
              />
            )}

            {distributorTab === 'analytics' && <DistributorAnalytics />}

            {distributorTab === 'profile' && (
              <div className="max-w-4xl mx-auto px-4 pt-4 pb-20">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 text-xs">
                  <h2 className="font-heading font-bold text-base text-slate-900">
                    Apex Electro-Distributors Kerala
                  </h2>
                  <p className="text-slate-500">
                    Master Regional Distributor • Hub Code: DIST-KER-EKM-01
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                    <span>Territory Network</span>
                    <strong className="text-slate-800">142 Authorized Retailers</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Fleet Trucks</span>
                    <strong className="text-indigo-700">8 Dedicated Freight Vehicles</strong>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Role-Aware Bottom Navigation */}
      <BottomNav
        role={currentRole}
        customerTab={customerTab}
        setCustomerTab={setCustomerTab}
        retailerTab={retailerTab}
        setRetailerTab={setRetailerTab}
        distributorTab={distributorTab}
        setDistributorTab={setDistributorTab}
      />

      {/* =========================================================================
          MODALS & OVERLAYS
         ========================================================================= */}

      {/* 1. Ask V-Guard AI Assistant Modal */}
      <AskVGuardModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onNavigateToService={(productName?: string, issue?: string) => {
          setIsAiModalOpen(false);
          const match = productName
            ? registeredProducts.find((p) =>
                p.name.toLowerCase().includes(productName.toLowerCase())
              )
            : registeredProducts[0];
          handleRaiseServiceForProduct(match || registeredProducts[0], issue);
        }}
        onNavigateToSolar={() => {
          setIsAiModalOpen(false);
          setCurrentRole('customer');
          setCustomerTab('solar');
        }}
      />

      {/* 2. Interactive Demo Journeys Modal */}
      <DemoJourneysModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectJourney={handleSelectJourney}
      />

      {/* 3. Smart Appliance IoT Controls Modal */}
      <SmartControlsModal
        isOpen={!!selectedSmartDevice}
        onClose={() => setSelectedSmartDevice(null)}
        devices={smartDevices}
        onUpdateDevice={(dev: SmartDeviceState) => handleUpdateSmartDevice(dev.id, dev)}
        initialDeviceId={selectedSmartDevice?.id}
      />

      {/* 4. Product Passport, Digital Warranty & Manual Viewer Modal */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onRaiseServiceForProduct={handleRaiseServiceForProduct}
      />

      {/* 5. Customer Register Product Modal */}
      <RegisterProductModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegisterProduct}
      />

      {/* 6. Retailer Stock Order Modal */}
      <RetailerOrderModal
        isOpen={isRetailerOrderModalOpen}
        onClose={() => setIsRetailerOrderModalOpen(false)}
        onPlaceOrder={handlePlaceRetailerOrder}
        initialItem={retailerOrderInitialItem}
      />

      {/* 7. Retailer Customer POS Registration Modal */}
      <RetailerCustomerRegisterModal
        isOpen={isRetailerCustRegModalOpen}
        onClose={() => setIsRetailerCustRegModalOpen(false)}
        onCustomerRegistered={handleRegisterProduct}
      />
    </div>
  );
};
export default App;

import React, { useState, useRef } from 'react';
import { ChevronDown, Calendar, Filter, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

const FinancialFilterForm = () => {
  const [formData, setFormData] = useState({
    region: 'AMERICA',
    csr: 'All',
    legalEntity: 'All',
    counterparty: 'All',
    cobFrom: '10-Oct-2022',
    cobTo: '11-Oct-2022',
    product: 'DERIVATIVES'
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const regionOptions = ['AMERICA', 'EUROPE', 'INDIA', 'JANSA', 'SAMERICA', 'SAUDI'];
  
  const csrOptions = [
    'All',
    'AAMINAIZ, RAHAMAN',
    'ASYA REVA',
    'GURPANU BUYAK',
    'JESSICAGAIL BURNS',
    'JOHANNA PAOLA VELOZ',
    'JOSEPH HARBAUGH',
    'JOSHUAADAM MOSKEY',
    'KATE',
    'KEVIN LIN',
    'KIMBERLY WALDMAN',
    'KRISTERJANUS MCCONNELL',
    'LORENZGICHARES RUSSOMANNO'
  ];

  const legalEntityOptions = [
    'All',
    'CHASE BANK (0008678900)',
    'J.P. MORGAN SECURITIES LLC (0006868700)'
  ];

  const counterpartyOptions = [
    'All',
    'CHASE BANK (0008678900)',
    'J.P. MORGAN SECURITIES LLC (0006868700)'
  ];

  const productOptions = ['DERIVATIVES', 'EQUITIES', 'FIXED INCOME', 'COMMODITIES'];

  const handleDropdownSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const constructPayload = () => {
    const payload = {
      filters: [
        {
          property: "region",
          operation: "EQUALS",
          value: formData.region,
          propertyType: "STRING"
        },
        {
          property: "csr", 
          operation: "EQUALS",
          value: formData.csr === "All" ? null : formData.csr,
          propertyType: "STRING"
        },
        {
          property: "legalEntity",
          operation: "EQUALS", 
          value: formData.legalEntity === "All" ? null : formData.legalEntity,
          propertyType: "STRING"
        },
        {
          property: "counterparty",
          operation: "EQUALS",
          value: formData.counterparty === "All" ? null : formData.counterparty, 
          propertyType: "STRING"
        },
        {
          property: "cob",
          operation: "GREATER_THAN_EQUALS",
          value: formData.cobFrom,
          propertyType: "DATE"
        },
        {
          property: "cob", 
          operation: "LESS_THAN_EQUALS",
          value: formData.cobTo,
          propertyType: "DATE"
        },
        {
          property: "product",
          operation: "EQUALS",
          value: formData.product,
          propertyType: "STRING"
        }
      ].filter(filter => filter.value !== null),
      requestPayload: {
        searchCriteria: {
          region: formData.region,
          csr: formData.csr === "All" ? "" : formData.csr,
          legalEntity: formData.legalEntity === "All" ? "" : formData.legalEntity,
          counterparty: formData.counterparty === "All" ? "" : formData.counterparty,
          cobFrom: formData.cobFrom,
          cobTo: formData.cobTo,
          product: formData.product
        }
      }
    };
    
    return payload;
  };

  const handleApplyFilters = async () => {
    const payload = constructPayload();
    console.log('Request Payload:', JSON.stringify(payload, null, 2));
    
    try {
      const response = await fetch('/api/financial-data/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Search results:', result);
      } else {
        console.error('Search failed:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const Dropdown = ({ label, value, options, field, width = "160px" }) => (
    <div style={{ display: 'inline-block', minWidth: width, marginRight: '12px' }}>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#6B46C1', marginBottom: '8px' }}>
        {label}
      </label>
      <div style={{ position: 'relative', width: width }}>
        <button
          type="button"
          onClick={() => toggleDropdown(field)}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '14px',
            border: '2px solid #C4B5FD',
            background: 'linear-gradient(to right, #FAF5FF, #FDF2F8)',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            color: '#374151',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#8B5CF6';
            e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#C4B5FD';
            e.target.style.boxShadow = 'none';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {value}
          </span>
          <ChevronDown style={{ width: '20px', height: '20px', color: '#8B5CF6', flexShrink: 0 }} />
        </button>
        
        {openDropdown === field && (
          <div style={{
            position: 'absolute',
            zIndex: 50,
            width: '100%',
            marginTop: '8px',
            backgroundColor: 'white',
            border: '2px solid #C4B5FD',
            borderRadius: '8px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxHeight: '192px',
            overflowY: 'auto'
          }}>
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDropdownSelect(field, option)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  textAlign: 'left',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(to right, #EDE9FE, #FCE7F3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const DateInput = ({ label, value, field, width = "160px" }) => (
    <div style={{ display: 'inline-block', minWidth: width, marginRight: '12px' }}>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#6B46C1', marginBottom: '8px' }}>
        {label}
      </label>
      <div style={{ position: 'relative', width: width }}>
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder="DD-MMM-YYYY"
          style={{
            width: '100%',
            padding: '12px 16px',
            paddingRight: '40px',
            fontSize: '14px',
            border: '2px solid #86EFAC',
            background: 'linear-gradient(to right, #F0FDF4, #EFF6FF)',
            borderRadius: '8px',
            outline: 'none',
            transition: 'all 0.2s'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#10B981';
            e.target.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#86EFAC';
            e.target.style.boxShadow = 'none';
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            if (e.target !== document.activeElement) {
              e.target.style.boxShadow = 'none';
            }
          }}
        />
        <Calendar style={{
          position: 'absolute',
          right: '12px',
          top: '12px',
          width: '20px',
          height: '20px',
          color: '#10B981',
          pointerEvents: 'none'
        }} />
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #A855F7, #EC4899, #EF4444)', padding: '24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '4px solid white',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(to right, #2563EB, #7C3AED, #EC4899)',
            borderRadius: '24px 24px 0 0',
            padding: '24px 32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <TrendingUp style={{ width: '32px', height: '32px', color: 'white' }} />
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                 Data Filters
              </h1>
              {/* <Filter style={{ width: '24px', height: '24px', color: 'white', marginLeft: 'auto' }} /> */}
            </div>
          </div>
          
          {/* Filter Form */}
          <div style={{
            padding: '32px',
            background: 'linear-gradient(to right, #DBEAFE, #EDE9FE, #FCE7F3)'
          }}>
            {/* Horizontal Scrollable Filter Container */}
            <div style={{ position: 'relative', width: '100%' }}>
              {/* Left Arrow */}
              <button
                onClick={scrollLeft}
                style={{
                  position: 'absolute',
                  left: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 30,
                  background: 'linear-gradient(to right, #3B82F6, #8B5CF6)',
                  color: 'white',
                  padding: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(to right, #2563EB, #7C3AED)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(to right, #3B82F6, #8B5CF6)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronLeft style={{ width: '20px', height: '20px' }} />
              </button>

              {/* Right Arrow */}
              <button
                onClick={scrollRight}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 30,
                  background: 'linear-gradient(to right, #8B5CF6, #EC4899)',
                  color: 'white',
                  padding: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(to right, #7C3AED, #DB2777)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(to right, #8B5CF6, #EC4899)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronRight style={{ width: '20px', height: '20px' }} />
              </button>

              {/* Horizontal Scrollable Container */}
              <div 
                ref={scrollContainerRef}
                style={{
                  overflowX: 'auto',
                  margin: '0 48px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  padding: '16px 0'
                }}
              >
                <style>
                  {`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                  `}
                </style>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'end', 
                  gap: '16px', 
                  minWidth: 'max-content',
                  whiteSpace: 'nowrap'
                }}>
                  <Dropdown
                    label="🌍 Region"
                    value={formData.region}
                    options={regionOptions}
                    field="region"
                    width="140px"
                  />
                  
                  <Dropdown
                    label="👤 CSR"
                    value={formData.csr}
                    options={csrOptions}
                    field="csr"
                    width="180px"
                  />
                  
                  <Dropdown
                    label="🏢 Legal Entity"
                    value={formData.legalEntity}
                    options={legalEntityOptions}
                    field="legalEntity"
                    width="240px"
                  />
                  
                  <Dropdown
                    label="🤝 Counterparty"
                    value={formData.counterparty}
                    options={counterpartyOptions}
                    field="counterparty"
                    width="240px"
                  />
                  
                  <DateInput
                    label="📅 COB From"
                    value={formData.cobFrom}
                    field="cobFrom"
                    width="160px"
                  />
                  
                  <div style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '8px', minWidth: '40px' }}>
                    <span style={{ color: '#EA580C', fontWeight: 'bold', fontSize: '18px', margin: '0 8px' }}>
                      to
                    </span>
                  </div>
                  
                  <DateInput
                    label="📅 COB To"
                    value={formData.cobTo}
                    field="cobTo"
                    width="160px"
                  />

                  <Dropdown
                    label="💼 Product"
                    value={formData.product}
                    options={productOptions}
                    field="product"
                    width="160px"
                  />
                  
                  <div style={{ display: 'inline-block', minWidth: '140px' }}>
                    <button
                      onClick={handleApplyFilters}
                      style={{
                        padding: '12px 24px',
                        background: 'linear-gradient(to right, #F97316, #EF4444, #EC4899)',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(to right, #EA580C, #DC2626, #DB2777)';
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(to right, #F97316, #EF4444, #EC4899)';
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      🔍 Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        
        </div>
      </div>
    </div>
  );
};

export default FinancialFilterForm;
// Reusable Modal Header Component
export const ModalHeader = ({ icon: Icon, title, subtitle }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
    <div style={{
      width: '48px', height: '48px', borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontSize: '20px',
    }}>
      <Icon />
    </div>
    <div>
      <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>{title}</div>
      <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>{subtitle}</div>
    </div>
  </div>
);

// Common Modal CSS string to append
export const modalStyles = `
.custom-modal .ant-modal-header {
    border-bottom: 2px solid #f0f0f0;
    padding: 24px 24px 20px;
}

.custom-modal .ant-modal-body {
    padding: 32px 24px 24px;
    max-height: 70vh;
    overflow-y: auto;
}

.custom-modal .ant-modal-body::-webkit-scrollbar { width: 6px; }
.custom-modal .ant-modal-body::-webkit-scrollbar-track { background: #f0f0f0; border-radius: 3px; }
.custom-modal .ant-modal-body::-webkit-scrollbar-thumb { background: #667eea; border-radius: 3px; }

.custom-modal .upload-placeholder:hover {
    border-color: #764ba2 !important;
    background: #fafafa !important;
    transform: scale(1.05);
}

.custom-modal .custom-form-tabs .ant-tabs-nav { margin-bottom: 24px; }
.custom-modal .custom-form-tabs .ant-tabs-tab { padding: 12px 20px; font-weight: 500; }
.custom-modal .custom-form-tabs .ant-tabs-tab:hover { color: #667eea; }
.custom-modal .custom-form-tabs .ant-tabs-tab-active {
    background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
    border-radius: 8px 8px 0 0;
}
.custom-modal .custom-form-tabs .ant-tabs-ink-bar {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    height: 3px;
}

.custom-modal .ant-form-item-label > label { font-weight: 600; color: #1f1f1f; }
.custom-modal .ant-input,
.custom-modal .ant-input-affix-wrapper,
.custom-modal .ant-input-textarea textarea {
    border-radius: 8px;
    border: 2px solid #f0f0f0;
}

.custom-modal .ant-input:focus,
.custom-modal .ant-input-affix-wrapper:focus,
.custom-modal .ant-input-affix-wrapper-focused,
.custom-modal .ant-input-textarea-focused textarea {
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

.custom-modal .modal-submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5) !important;
}

.custom-modal .image-upload-area { animation: fadeIn 0.5s ease; }

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}
`;


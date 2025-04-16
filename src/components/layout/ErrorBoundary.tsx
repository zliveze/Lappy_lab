import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface Props {
  children: ReactNode;
  fallbackMessage?: string; // Tùy chọn thông báo dự phòng
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // Cập nhật state để hiển thị UI dự phòng
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Ghi lại thông tin lỗi
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Bạn có thể gửi lỗi này đến một dịch vụ báo cáo lỗi ở đây
    // ví dụ: Sentry.captureException(error);
  }

  // Hàm reset lỗi (ví dụ khi người dùng nhấn nút thử lại)
  private resetError = () => {
    this.setState({ hasError: false, error: undefined });
    // Có thể thêm logic để thử tải lại component con nếu cần
  };

  public render() {
    if (this.state.hasError) {
      // --- Giao diện dự phòng khi có lỗi --- 
      return (
        <div 
          className="bg-red-900/20 border border-red-600/50 rounded-lg p-6 text-center text-red-300 animate-fadeInUp flex flex-col items-center justify-center h-full min-h-[200px]"
          role="alert"
        >
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-3xl text-red-400 mb-4" />
          <h3 className="text-lg font-semibold text-red-200 mb-2">Rất tiếc, đã xảy ra lỗi!</h3>
          <p className="text-sm mb-4 max-w-md mx-auto">
            {this.props.fallbackMessage || "Component này đã gặp sự cố. Vui lòng thử làm mới trang hoặc thử lại sau."}
          </p>
          {/* Hiển thị thông tin lỗi chi tiết (chỉ trong môi trường dev) */} 
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="text-left text-xs bg-red-900/30 p-3 rounded border border-red-700/50 mb-4 max-w-full overflow-auto">
              <summary className="cursor-pointer font-medium text-red-300">Chi tiết lỗi (Dev)</summary>
              <pre className="mt-2 whitespace-pre-wrap break-all">
                {this.state.error.toString()}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <button
            onClick={this.resetError}
            className="px-4 py-1.5 bg-red-600/50 hover:bg-red-600/80 text-white rounded-md text-sm font-medium transition-colors"
          >
            Thử Lại
          </button>
        </div>
      );
    }

    // Nếu không có lỗi, render các component con bình thường
    return this.props.children;
  }
}

export default ErrorBoundary; 
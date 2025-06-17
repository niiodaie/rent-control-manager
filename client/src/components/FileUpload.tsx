import { useCallback } from "react";
import { CloudUpload, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  accept?: string;
  maxSize?: number;
  className?: string;
}

export default function FileUpload({ 
  onFileSelect, 
  selectedFile, 
  accept = ".jpg,.jpeg,.png,.pdf",
  maxSize = 5 * 1024 * 1024, // 5MB default
  className = "" 
}: FileUploadProps) {
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileSelection = (file: File) => {
    // Check file size
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: `File size must be less than ${(maxSize / (1024 * 1024)).toFixed(1)}MB`,
        variant: "destructive",
      });
      return;
    }

    // Check file type
    const acceptedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const mimeTypeAccepted = acceptedTypes.some(type => 
      type.startsWith('.') ? type === fileExtension : file.type.includes(type)
    );

    if (!mimeTypeAccepted) {
      toast({
        title: "Invalid file type",
        description: `Please select a file with one of these types: ${accept}`,
        variant: "destructive",
      });
      return;
    }

    onFileSelect(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const removeFile = () => {
    onFileSelect(null);
  };

  if (selectedFile) {
    return (
      <div className={`border-2 border-neutral-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm font-medium text-neutral-900">{selectedFile.name}</p>
              <p className="text-xs text-neutral-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer ${className}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => document.getElementById(`file-input-${Math.random()}`)?.click()}
    >
      <CloudUpload className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
      <p className="text-sm text-neutral-600 mb-2">
        Drag and drop your file here, or <span className="text-primary font-medium">browse</span>
      </p>
      <p className="text-xs text-neutral-500">
        Supports: JPG, PNG, PDF (Max {(maxSize / (1024 * 1024)).toFixed(1)}MB)
      </p>
      <input
        id={`file-input-${Math.random()}`}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileInputChange}
      />
    </div>
  );
}

<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/';
    $musicDir = $uploadDir . 'music/';
    $imageDir = $uploadDir . 'images/';
    
    // Create directories if they don't exist
    if (!file_exists($musicDir)) {
        mkdir($musicDir, 0777, true);
    }
    if (!file_exists($imageDir)) {
        mkdir($imageDir, 0777, true);
    }
    
    $response = ['success' => false, 'message' => ''];
    
    try {
        // Handle music file upload
        if (isset($_FILES['musicFile']) && $_FILES['musicFile']['error'] === UPLOAD_ERR_OK) {
            $musicFile = $_FILES['musicFile'];
            $musicFileName = time() . '_' . basename($musicFile['name']);
            $musicFilePath = $musicDir . $musicFileName;
            
            if (move_uploaded_file($musicFile['tmp_name'], $musicFilePath)) {
                $response['musicUrl'] = $musicFilePath;
            }
        }
        
        // Handle album art upload
        if (isset($_FILES['albumArt']) && $_FILES['albumArt']['error'] === UPLOAD_ERR_OK) {
            $imageFile = $_FILES['albumArt'];
            $imageFileName = time() . '_' . basename($imageFile['name']);
            $imageFilePath = $imageDir . $imageFileName;
            
            if (move_uploaded_file($imageFile['tmp_name'], $imageFilePath)) {
                $response['imageUrl'] = $imageFilePath;
            }
        }
        
        $response['success'] = true;
        $response['message'] = 'Files uploaded successfully';
        
    } catch (Exception $e) {
        $response['message'] = 'Upload failed: ' . $e->getMessage();
    }
    
    echo json_encode($response);
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>
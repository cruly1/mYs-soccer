package com.app.manageyself_soccer.utils;

import com.app.manageyself_soccer.dao.ImageRepository;
import com.app.manageyself_soccer.model.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
@RequiredArgsConstructor
public class ImageUtils {

    private final ImageRepository imageRepository;

    public byte[] decompressImage(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }
            outputStream.close();
        } catch (Exception ignored) {
        }
        return outputStream.toByteArray();
    }

    public byte[] compressImage(byte[] data) {
        try {
            Deflater deflater = new Deflater();
            deflater.setLevel(Deflater.BEST_COMPRESSION);
            deflater.setInput(data);
            deflater.finish();

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
            byte[] tmp = new byte[4 * 1024];

            while (!deflater.finished()) {
                int size = deflater.deflate(tmp);
                outputStream.write(tmp, 0, size);
            }
            outputStream.close();

            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public Image buildImage(MultipartFile file, String model) throws IOException {
        return imageRepository.save(Image.builder()
                .name(model)
                .type(file.getContentType())
                .imageData(compressImage(file.getBytes())).build());
    }
}

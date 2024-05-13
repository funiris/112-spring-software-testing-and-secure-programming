//TODO

void antiasan(unsigned long addr) {
    // This offset value (0x7fff8000) is specific to AddressSanitizer (ASan) 
    // and is used to map main memory addresses to corresponding shadow byte
    // addresses in the shadow memory region
    
    // Calculate the shadow byte address
    unsigned long shadow_byte_addr = (addr >> 3) + 0x7fff8000;

    // Convert the address to a char pointer
    char *shadow_byte = (char *)shadow_byte_addr;

    // Set the shadow byte to 0
    *shadow_byte = 0;
}

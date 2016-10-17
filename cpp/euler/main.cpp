//
//  main.cpp
//  euler
//
//  Created by Peter Benson on 10/3/16.
//  Copyright © 2016 Peter Benson. All rights reserved.
//

#include <iostream>
#include <math.h>

bool isPrime(const int64_t n) {
    if(n < 2) {
        return false;
    }
    if(n == 2) {
        return true;
    }
    int64_t maxFactor = (int) (sqrt(n) + 1);
    int factor = 3;
    while(factor <= maxFactor) {
        if(n % factor == 0) {
            return false;
        }
        factor += 2;
    }
    return true;
}

int32_t nextPrimeAfter(int32_t n) {
    n = (n % 2 == 0) ? n + 1 : n+ 2;
    while (!isPrime(n)) {
        n += 2;
    }
    return n;
}

int main(int argc, const char * argv[]) {
    std::cout << nextPrimeAfter(1000) << '\n';
    return 0;
}

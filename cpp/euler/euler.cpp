//
//  euler.cpp
//
//  Created by Peter Benson on 10/3/16.
//  Copyright © 2016 Peter Benson. All rights reserved.
//

#include <algorithm>
#include <iostream>
#include <math.h>
#include <map>
#include <vector>
#include "euler.h"

static std::vector<int> PRIMES = {2, 3, 5};

std::vector<int64_t> allFactors(int64_t n) {
    std::map<int64_t, int64_t> primeMap = primeToCountMap(n);
    std::vector<int64_t> all;
    all.push_back(1);
    for(std::map<int64_t, int64_t>::iterator iterMap = primeMap.begin(); iterMap != primeMap.end(); ++iterMap) {
        int64_t prime = iterMap->first;
        int64_t power = iterMap->second;
        std::vector<int64_t> allCopy = all;
        for(std::vector<int64_t>::iterator iterFactors = allCopy.begin(); iterFactors != allCopy.end(); ++iterFactors) {
            int64_t factor = *iterFactors;
            for(int k = 1; k <= power; ++k) {
                all.push_back(factor * pow(prime, k));
            }
        }
    }
    std::sort(all.begin(), all.end());
    return all;
}


int64_t comb(int a, int b) {
    int64_t result = 1;
    b = (b < a-b) ? b : a - b;
    for(int i = a; i > a-b ;--i) {
        result *= i;
    }
    for(int i = 2; i <= b ;++i) {
        result /= i;
    }
    return result;
}

int64_t factorial(int n) {
    if(n < 0) {
        return -1;
    }
    if (n < 2) {
        return 1;
    }
    int64_t result = 2;
    for(int i = 3; i <=n; ++i) {
        result *= i;
    }
    return result;
}


int gcd(int a, int b) {
    if (a < b) {
        return gcd(b, a);
    }
    if(a % b == 0) {
        return b;
    }
    return gcd(b, a - a / b * b);
}

bool isPalindrome(int64_t n) {
    std::string nStr = std::to_string(n);
    std::string nStrReverse = nStr;
    std::reverse(nStrReverse.begin(), nStrReverse.end());
    return nStr == nStrReverse;
}

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

bool isPrimeFast(const int64_t n) {
    if(n < 2) {
        return false;
    }
    if(n == 2) {
        return true;
    }
    int k = 1, f = 3;
    while(f*f <= n) {
        if(n % f == 0) {
            return false;
        }
        k += 1;
        f = kthPrime(k);
    }
    return true;
}

int kthPrime(int k) {
    while(PRIMES.size() <= k) {
        PRIMES.push_back(nextPrimeAfter(PRIMES[PRIMES.size()-1]));
    }
    return PRIMES.at(k-1);
}

int64_t leastPrimeFactor(int64_t n) {
    int p = 2;
    while (p * p <= n) {
        if(n % p == 0) {
            return p;
        }
        p = (p ==2) ? 3 : p + 2;
    }
    return n;
}

int64_t maxPrimeFactor(int64_t n) {
    int p = 2;
    while (p*p <= n) {
        if (n % p == 0) {
            n /= p;
        }
        else {
            p = (p == 2) ? 3 : p + 2;
        }
    }
    return n;
}

int32_t nextPrimeAfter(int32_t n) {
    n = (n % 2 == 0) ? n + 1 : n+ 2;
    while (!isPrime(n)) {
        n += 2;
    }
    return n;
}

std::map<int64_t, int64_t> primeToCountMap(int64_t n) {
    std::map<int64_t, int64_t> primeToCountMap;
    while(n > 1) {
        int64_t prime = leastPrimeFactor(n);
        if(primeToCountMap.find(prime) != primeToCountMap.end()) {
            primeToCountMap[prime] += 1;
        } else {
             primeToCountMap[prime] = 1;
        }
        n /= prime;
    }
    return primeToCountMap;
}


int64_t sumDivisors(int64_t n){
    int64_t answer = 1;
    std::map<int64_t, int64_t> primeMap = primeToCountMap(n);
    for(std::map<int64_t, int64_t>::iterator iterMap = primeMap.begin(); iterMap != primeMap.end(); ++iterMap) {
        int64_t prime = iterMap->first;
        int64_t power = iterMap->second;
        answer *= (pow(prime, power+1) - 1) / (prime - 1);
    }
    return answer;
}

int64_t sumProperDivisors(int64_t n){
    return sumDivisors(n) - n;
}
